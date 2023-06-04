import {
  type TSaveTeacherAvailabilityPayload,
  type TSaveTeacherBadgesPayload,
  type TSaveTeacherLocationPayload,
  type TSaveTeacherOtherServices,
  type TSaveTeacherPayload,
  type TSaveTeacherProfilePayload,
  type TSaveTeacherQualificationsPayload,
  type TSaveTeacherSubjectsPayload,
  type TSaveTeacherTeachingLifePayload,
} from './schema'
import { prisma } from '~/server/db'
import { excludeKeysFromObject } from '@utils'
import isEmpty from 'lodash.isempty'
import { type TFile } from '~/server/api/types'
import { EProfileCompletenessLabels } from '~/server/api/logic/teachers/utils/labels'
import { type TCompletenessStep } from '~/server/api/logic/teachers/types'

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

export const getTeacherSubjects = async (userId: string) => {
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

export const saveTeacherQualifications = async (
  payload: TSaveTeacherQualificationsPayload,
  userId: string
) => {
  const teacherFromDb = await getTeacherByUserId(userId)

  await prisma.teacher.update({
    where: {
      userId,
    },
    data: {
      qualifications: {
        // Order of operations is important here. This is a workaround, since updateMany is bugged in Prisma rn.
        deleteMany: {
          teacherId: teacherFromDb?.id as string,
        },
        createMany: {
          data: payload.qualifications,
        },
      },
    },
  })

  if (!!payload.achievements) {
    await prisma.teacher.update({
      where: {
        userId,
      },
      data: {
        achievements: {
          // Order of operations is important here. This is a workaround, since updateMany is bugged in Prisma rn.
          deleteMany: {
            teacherId: teacherFromDb?.id as string,
          },
          createMany: {
            data: payload.achievements,
          },
        },
      },
    })
  }
}

export const getTeacherQualifications = async (userId: string) => {
  return await prisma.teacher.findUnique({
    where: {
      userId,
    },
    include: {
      qualifications: true,
      achievements: true,
    },
  })
}

export const getTeacherExperience = async (userId: string) => {
  return await prisma.teacher.findUnique({
    where: {
      userId,
    },
    include: {
      experience: true,
    },
  })
}

export const saveExperience = async (
  payload: TSaveTeacherTeachingLifePayload,
  userId: string
) => {
  const experienceFromDb = await getTeacherExperience(userId)

  if (!experienceFromDb?.experience) {
    return prisma.teacher.update({
      where: {
        userId,
      },
      data: {
        experience: {
          create: payload,
        },
      },
    })
  }

  return prisma.teacher.update({
    where: {
      userId,
    },
    data: {
      experience: {
        delete: true,
        create: payload,
      },
    },
  })
}

export const saveTeacherProfile = async (
  payload: TSaveTeacherProfilePayload,
  userId: string
) => {
  const teacherFromDb = await getTeacherByUserId(userId)

  return await prisma.teacher.update({
    where: {
      userId,
    },

    data: {
      ...excludeKeysFromObject(payload, ['socialLinks']),
      socialLinks: {
        deleteMany: {
          teacherId: teacherFromDb?.id,
        },
        createMany: {
          data: payload.socialLinks,
        },
      },
    },
  })
}

export const getTeacherProfile = async (userId: string) => {
  return await prisma.teacher.findUnique({
    where: {
      userId,
    },
    include: {
      socialLinks: true,
    },
  })
}

export const getTeacherAvailability = async (userId: string) => {
  return await prisma.teacher.findUnique({
    where: {
      userId,
    },
    include: {
      availability: {
        include: {
          files: true,
        },
      },
    },
  })
}

export const saveTeacherAvailability = async (
  payload: TSaveTeacherAvailabilityPayload,
  userId: string
) => {
  const teacherFromDb = await getTeacherAvailability(userId)

  if (!teacherFromDb?.availability) {
    return await prisma.teacher.update({
      where: {
        userId,
      },
      data: {
        availability: {
          create: {
            ...payload,
            files: {
              createMany: {
                data: payload.files,
              },
            },
          },
        },
      },
    })
  }

  return await prisma.teacher.update({
    where: {
      userId,
    },
    data: {
      availability: {
        update: {
          ...payload,
          files: {
            deleteMany: {
              teacherAvailabilityId: teacherFromDb?.availability?.id,
            },
            createMany: {
              data: payload.files,
            },
          },
        },
      },
    },
  })
}

export const getTeacherOtherServices = async (userId: string) => {
  return await prisma.teacher.findUnique({
    where: {
      userId,
    },
    include: {
      otherServices: true,
    },
  })
}

export const saveTeacherOtherServices = async (
  payload: TSaveTeacherOtherServices,
  userId: string
) => {
  const teacherFromDb = await getTeacherOtherServices(userId)

  if (!teacherFromDb?.otherServices) {
    return await prisma.teacher.update({
      where: {
        userId,
      },
      data: {
        otherServices: {
          createMany: {
            data: payload.otherServices,
          },
        },
      },
    })
  }

  return await prisma.teacher.update({
    where: {
      userId,
    },
    data: {
      otherServices: {
        deleteMany: {
          teacherId: teacherFromDb?.id,
        },
        createMany: {
          data: payload.otherServices,
        },
      },
    },
  })
}

export const getTeacherProfileCompletionProgress = async (userId: string) => {
  const teacherFromDb = await prisma.teacher.findUnique({
    where: {
      userId,
    },
    include: {
      subjects: true,
      qualifications: true,
      experience: true,
      availability: true,
      otherServices: true,
      location: true,
      badges: true,
    },
  })

  const filteredObject =
    excludeKeysFromObject(teacherFromDb, [
      // TODO: Refactor
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      'createdAt',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      'updatedAt',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      'id',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      'userId',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      'about',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      'dateOfBirth',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      'profilePhoto',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      'gender',
    ]) ?? {}

  const steps = Object.entries(filteredObject ?? {})
    .filter(([key]) => key !== 'profileStatus')
    .reduce((acc, [key, value]) => {
      const isStepComplete =
        (!Array.isArray(value) && value !== null) ||
        (Array.isArray(value) && value?.length > 0)

      if (key === 'title') {
        acc = {
          ...acc,
          profile: {
            title: EProfileCompletenessLabels['profile']?.title,
            isComplete: isStepComplete,
          },
        }

        return acc
      }

      acc = {
        ...acc,
        [key]: {
          title: EProfileCompletenessLabels[key]?.title,
          isComplete: isStepComplete,
          isOptional: !!EProfileCompletenessLabels[key]?.isOptional,
        },
      }
      return acc
    }, {}) as TCompletenessStep[]

  const totalSteps = Object.keys(steps).length

  const completeSteps = Object.values(steps).filter(
    (step) => step.isComplete
  ).length

  const progress = Math.round((completeSteps / totalSteps) * 100)

  const isProfileReadyForReview = Object.values(steps)
    .filter((step) => !step.isOptional)
    .every((step) => step.isComplete)
    ? 'READY_FOR_REVIEW'
    : 'NOT_READY_FOR_REVIEW'

  const profileStatus =
    teacherFromDb?.profileStatus === 'NOT_STARTED'
      ? isProfileReadyForReview
      : teacherFromDb?.profileStatus

  return {
    progress,
    steps,
    profileStatus,
  }
}

export const saveTeacherBadges = async (
  payload: TSaveTeacherBadgesPayload,
  userId: string
) => {
  const files = Object.values(payload)
    .flat(1)
    .filter((value) => !isEmpty(value))

  const teacherFromDb = await prisma.teacher.findUnique({
    where: {
      userId,
    },
    include: {
      badges: {
        include: {
          files: true,
        },
      },
    },
  })

  const createBadgesPromise = prisma.teacher.update({
    where: {
      userId,
    },
    data: {
      badges: {
        create: {
          files: {
            createMany: {
              data: files,
            },
          },
        },
      },
    },
  })

  if (!teacherFromDb?.badges) {
    return await createBadgesPromise
  }

  await prisma.file.deleteMany({
    where: {
      teacherBadgeId: teacherFromDb?.badges?.id,
    },
  })

  await prisma.teacherBadge.delete({
    where: {
      teacherId: teacherFromDb?.id,
    },
  })

  return createBadgesPromise
}

const getBadgeFiles = (files: TFile[], fileType: string) =>
  files
    .filter((el) => el.fileType === fileType)
    .map((el) => ({
      name: el.name,
      content: el.content,
    }))

export const getTeacherBadges = async (userId: string) => {
  const teacher = await prisma.teacher.findUnique({
    where: {
      userId,
    },
    include: {
      badges: {
        include: {
          files: true,
        },
      },
    },
  })

  return {
    qualificationBadges: getBadgeFiles(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      teacher?.badges?.files ?? [],
      'qualificationBadges'
    ),
    degreeBadges: getBadgeFiles(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      teacher?.badges?.files ?? [],
      'degreeBadges'
    ),
    examinerBadges: getBadgeFiles(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      teacher?.badges?.files ?? [],
      'examinerBadges'
    ),
    dbsBadges: getBadgeFiles(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      teacher?.badges?.files ?? [],
      'dbsBadges'
    ),
  }
}
