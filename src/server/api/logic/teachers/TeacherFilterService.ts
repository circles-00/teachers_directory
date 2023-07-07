import { subDays } from 'date-fns'
import { prisma } from '../../../db'
import { type TSearchTeacherQueryPayload } from './schema'
import { defaultProfilePhoto } from './utils/defaultProfilePhoto'

export const searchTeachers = async (payload: TSearchTeacherQueryPayload) => {
  const where = payload.reduce((acc, item) => {
    if (item.relation === 'availability') {
      const availabilityWhere = {
        ...acc,
        availability: { OR: [] as any[] },
      }
      if (item.value.includes('Now')) {
        availabilityWhere.availability.OR.push({
          availableNow: item.value.includes('Now'),
        })
      }

      if (item.value.includes('Future')) {
        availabilityWhere.availability.OR.push({
          startDate: {
            not: null,
          },
        })
      }

      return availabilityWhere
    }

    if (item.isNested) {
      return {
        ...acc,
        [item.relation]: {
          [item?.nestedRelation ?? '']: {
            in: item.value,
            mode: 'insensitive',
          },
        },
      }
    }

    return {
      ...acc,
      [item.relation]: {
        in: item.value,
        mode: 'insensitive',
      },
    }
  }, {})

  const results = await prisma.teacher.findMany({
    where: {
      ...where,
      activatedAt: {
        // TODO: Find a way to include subscribed users as well
        gte: subDays(new Date(), 60),
      },
    },
    include: {
      subjects: true,
      otherServices: true,
      experience: true,
      availability: true,
      location: true,
      user: true,
    },
  })

  // Replace profile photo with default if it's not set
  return results.map((teacher) => {
    if (!teacher.profilePhoto) {
      return {
        ...teacher,
        profilePhoto: defaultProfilePhoto,
      }
    }

    return teacher
  })
}
