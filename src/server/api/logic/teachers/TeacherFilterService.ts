import { prisma } from '../../../db'
import { type TSearchTeacherQueryPayload } from './schema'
import { defaultProfilePhoto } from './utils/defaultProfilePhoto'

interface IAvailabilityWhere {
  availability?: {
    typeOfJob?: {
      in: string[]
    }
    OR?: any[]
  }
}

type IWhere = IAvailabilityWhere

export const searchTeachers = async (payload: TSearchTeacherQueryPayload) => {
  // TODO: Careful with filter
  const where = payload.reduce((acc, item) => {
    switch (item.relation) {
      case 'availability':
      case 'typeOfJob':
        const availabilityWhere: IAvailabilityWhere = {
          ...acc,
          availability: {
            typeOfJob: acc.availability?.typeOfJob,
            OR: acc?.availability?.OR ?? [],
          },
        }
        if (item.value.includes('Now')) {
          availabilityWhere?.availability?.OR?.push({
            availableNow: item.value.includes('Now'),
          })
        }

        if (item.value.includes('Future')) {
          availabilityWhere?.availability?.OR?.push({
            startDate: {
              not: null,
            },
          })
        }

        if (item.relation === 'typeOfJob' && availabilityWhere.availability) {
          availabilityWhere.availability.typeOfJob = {
            in: item.value,
          }
        }

        return availabilityWhere

      case 'examiner':
      case 'experience':
        return {
          ...acc,
          OR: [
            {
              experience: {
                role: {
                  in: item.value,
                },
              },
            },
            {
              experience: {
                subRole: {
                  in: item.value,
                },
              },
            },
            {
              experience: {
                examBoard: {
                  hasSome: item.value,
                },
              },
            },
          ],
        }

      case 'badges':
        return {
          ...acc,
          badges: {
            files: {
              some: {
                fileType: {
                  in: item.value,
                },
              },
            },
          },
        }

      default:
        return {
          ...acc,
          [item.relation]: {
            in: item.value.map((value) => value.toLowerCase()),
          },
        }
    }
  }, {} as IWhere) as unknown as IWhere

  console.log(JSON.stringify(where, null, 2))
  if (where?.availability?.OR?.length === 0) {
    delete where.availability?.OR
  }

  const results = await prisma.teacher.findMany({
    where: {
      ...where,
      // activatedAt: {
      //   // TODO: Find a way to include subscribed users as well
      //   gte: subDays(new Date(), 60),
      // },
    },
    include: {
      subjects: true,
      otherServices: true,
      experience: true,
      availability: true,
      location: true,
      user: true,
      badges: true,
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
