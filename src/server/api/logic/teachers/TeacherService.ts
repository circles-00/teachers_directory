import {
  type TSaveTeacherLocationPayload,
  type TSaveTeacherPayload,
} from './schema'
import { prisma } from '~/server/db'

export const saveTeacher = (payload: TSaveTeacherPayload) => {
  return prisma.teacher.create({
    data: {
      userId: payload.userId,
    },
  })
}

export const getTeacherByUserId = (userId: string) => {
  return prisma.teacher.findUnique({
    where: {
      userId,
    },
  })
}

export const getTeacherLocationByTeacherId = async (userId: string) => {
  const teacherFromDb = await getTeacherByUserId(userId)

  return prisma.teacherLocation.findUnique({
    where: {
      teacherId: teacherFromDb?.id as string,
    },
  })
}

export const saveTeacherLocation = async (
  payload: TSaveTeacherLocationPayload,
  userId: string
) => {
  const teacherFromDb = await getTeacherByUserId(userId)

  const dataToSave = {
    ...payload,
    teacherId: teacherFromDb?.id as string,
  }

  return await prisma.teacherLocation.upsert({
    create: dataToSave,
    update: dataToSave,
    where: {
      teacherId: teacherFromDb?.id as string,
    },
  })
}
