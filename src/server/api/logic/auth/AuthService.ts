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

const hashPassword = async (password: string) => {
  const salt = await genSalt(10)
  return hash(password, salt)
}

export const generateRandom6DigitCode = () => {
  return Math.floor(100000 + Math.random() * 900000)
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

  const dataToInsert = {
    ...data,
    verificationCode: randomCode,
    verificationCodeExpiresAt: new Date(new Date().getTime() + 30 * 60 * 1000),
    password: await hashPassword(data.password),
  }

  return excludeKeysFromObject(
    await prisma.user.upsert({
      create: {
        ...dataToInsert,
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

  const isPasswordValid = await compare(password, userFromDb.password)

  if (!isPasswordValid || !userFromDb.verified) {
    throw invalidUserError
  }

  return userFromDb
}

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  })
}
