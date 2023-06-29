import {
  type TLoginPayload,
  type TResendVerificationEmailPayload,
  type TSignUpPayload,
  type TVerifyAccountPayload,
} from '~/server/api/logic'
import { prisma } from '~/server/db'
import { Mailer } from '~/server/api/logic/mailer'
import { compare, genSalt, hash } from 'bcryptjs'
import { TRPCError } from '@trpc/server'
import { excludeKeysFromObject } from '@utils'
import { type TUserRole } from '@shared'
import { TeacherService } from '../teachers'
import { PaymentsService } from '../payments'

const hashPassword = async (password: string) => {
  const salt = await genSalt(10)
  return hash(password, salt)
}

// TODO: Maybe move this to a util function
export const generateRandom6DigitCode = () => {
  return Math.floor(100000 + Math.random() * 900000)
}

const createUserProfile = async (userId: string, role: TUserRole) => {
  switch (role) {
    case 'TEACHER':
      return TeacherService.saveOrUpdateTeacher({ userId })

    // TODO: Add cases for other roles

    default:
      return null
  }
}

export const signUp = async (data: TSignUpPayload) => {
  const userFromDb = await findUserByEmail(data.email)

  if (userFromDb && userFromDb.verified) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'User already exists',
    })
  }

  const randomCode = generateRandom6DigitCode()

  try {
    await Mailer.get().sendMail({
      to: data.email,
      subject: 'Account Activation',
      text: `
    Your activation code is ${randomCode}.
    The code is valid for 30 minutes.
    `,
    })
  } catch (error) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to send email',
    })
  }

  const { id: stripeCustomerId } = await PaymentsService.createCustomer({
    email: data.email,
    name: `${data.firstName} ${data.lastName}`,
  })

  const dataToInsert = {
    ...data,
    id: userFromDb?.id,
    verificationCode: randomCode,
    verificationCodeExpiresAt: new Date(new Date().getTime() + 30 * 60 * 1000),
    password: await hashPassword(data.password),
  }

  const createdUser = excludeKeysFromObject(
    await prisma.user.upsert({
      create: {
        ...dataToInsert,
        paymentProfile: {
          create: {
            stripeCustomerId,
          },
        },
      },
      update: {
        ...dataToInsert,
      },
      where: {
        email: data.email,
      },
    }),
    ['password']
  )

  await createUserProfile(createdUser.id, createdUser.role)

  return createdUser
}

export const verifyAccount = async ({ email, code }: TVerifyAccountPayload) => {
  const userFromDb = await findUserByEmail(email)

  if (!userFromDb) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'User not found',
    })
  }

  if (
    userFromDb.verified ||
    userFromDb.verificationCode !== code ||
    userFromDb.verificationCodeExpiresAt < new Date()
  ) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Invalid verification code',
    })
  }

  return prisma.user.update({
    where: {
      email,
    },
    data: {
      verified: true,
    },
  })
}

export const resendVerificationEmail = async ({
  email,
}: TResendVerificationEmailPayload) => {
  const userFromDb = await findUserByEmail(email)

  if (!userFromDb) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'User not found',
    })
  }

  if (userFromDb.verified) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'User already verified',
    })
  }

  const randomCode = generateRandom6DigitCode()

  try {
    await Mailer.get().sendMail({
      to: email,
      subject: 'Account Activation',
      text: `
    Your activation code is ${randomCode}.
    The code is valid for 30 minutes.
    `,
    })
  } catch (error) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to send email',
    })
  }

  return prisma.user.update({
    where: {
      email,
    },
    data: {
      verificationCode: randomCode,
      verificationCodeExpiresAt: new Date(
        new Date().getTime() + 30 * 60 * 1000
      ),
    },
  })
}

export const login = async ({ email, password }: TLoginPayload) => {
  const invalidUserError = new TRPCError({
    code: 'BAD_REQUEST',
    message: 'Invalid email or password',
  })
  const userFromDb = await findUserByEmail(email)

  if (!userFromDb) {
    throw invalidUserError
  }

  const isPasswordValid = await compare(password, userFromDb?.password ?? '')

  if (!isPasswordValid || !userFromDb.verified) {
    throw invalidUserError
  }

  return excludeKeysFromObject(userFromDb, ['profilePicture'])
}

export const findUserByEmail = async (email: string) => {
  if (!email) return null

  const userFromDb = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      Teacher: true,
    },
  })

  if (!userFromDb) return null

  const { Teacher, ...user } = userFromDb

  return {
    ...user,
    profilePicture: Teacher?.profilePhoto,
  }
}

export const findUserPaymentProfileByUserId = async (userId: string) => {
  const userFromDb = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      paymentProfile: {
        include: {
          paymentMethods: true,
        },
      },
    },
  })

  return userFromDb?.paymentProfile
}

export const findUserPaymentMethodsByUserId = async (userId: string) => {
  const paymentProfile = await findUserPaymentProfileByUserId(userId)

  return paymentProfile?.paymentMethods
}

export const updatePaymentClientSecret = async (
  userId: string,
  clientSecret: string
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      paymentProfile: {
        update: {
          clientSecret,
        },
      },
    },
  })
}
