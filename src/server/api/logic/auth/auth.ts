import {
  type TSignUpPayload,
  type TVerifyAccountPayload,
} from '~/server/api/logic'
import { prisma } from '~/server/db'
import { Mailer } from '~/server/api/logic/mailer'
import { genSalt, hash } from 'bcryptjs'
import { TRPCError } from '@trpc/server'

const hashPassword = async (password: string) => {
  const salt = await genSalt(10)
  return hash(password, salt)
}

export const generateRandom6DigitCode = () => {
  return Math.floor(100000 + Math.random() * 900000)
}

export const signUp = async (data: TSignUpPayload) => {
  const randomCode = generateRandom6DigitCode()

  await Mailer.get().sendMail({
    to: data.email,
    subject: 'Account Activation',
    text: `
    Your activation code is ${randomCode}.
    The code is valid for 30 minutes.
    `,
  })

  const dataToInsert = {
    ...data,
    verificationCode: randomCode,
    verificationCodeExpiresAt: new Date(new Date().getTime() + 30 * 60 * 1000),
    password: await hashPassword(data.password),
  }

  return await prisma.user.upsert({
    create: {
      ...dataToInsert,
    },
    update: {
      ...dataToInsert,
    },
    where: {
      email: data.email,
    },
  })
}

export const verifyAccount = async ({ email, code }: TVerifyAccountPayload) => {
  const userFromDb = await prisma.user.findUnique({
    where: {
      email,
    },
  })

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
