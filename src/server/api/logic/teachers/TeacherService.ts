import {
  type TSaveTeacherLocationPayload,
  type TSaveTeacherPayload,
  type TSaveTeacherSubjectsPayload,
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
  const teacherLocation = await prisma.teacher.findUnique({
    where: {
      userId,
    },
    include: {
      location: true,
    },
  })

  return teacherLocation?.location
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

export const saveTeacherSubjects = async (
  payload: TSaveTeacherSubjectsPayload,
  userId: string
) => {
  const teacherFromDb = await getTeacherByUserId(userId)

  return prisma.teacher.update({
    where: {
      userId,
    },
    data: {
      subjects: {
        // Order of operations is important here. This is a workaround, since updateMany is bugged in Prisma rn.
        deleteMany: {
          teacherId: teacherFromDb?.id as string,
        },
        createMany: {
          data: payload.subjects,
        },
      },
    },
  })
}

export const getTeacherSubjectsByTeacherId = async (userId: string) => {
  const teacherSubjects = await prisma.teacher.findUnique({
    where: {
      userId,
    },
    include: {
      subjects: true,
    },
  })

  return teacherSubjects?.subjects
}
