import { z } from 'zod'
import { formRequiredString } from '@utils'

// TODO: Share form schema between client and server, and delete this file

export const saveTeacherLocationPayload = z.object({
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  streetAddress: z.string(),
  secondaryAddress: z.string().optional(),
  city: z.string(),
  postCode: z.string(),
})

export type TSaveTeacherLocationPayload = z.infer<
  typeof saveTeacherLocationPayload
>

export const saveTeacherPayload = z.object({
  userId: z.string().cuid(),
})

export type TSaveTeacherPayload = z.infer<typeof saveTeacherPayload>

export const saveTeacherSubjectsPayload = z.object({
  subjects: z.array(
    z.object({
      subjectName: formRequiredString(),
      level: formRequiredString(),
      examBoard: z.string().optional(),
      isMainSubject: z.boolean(),
    })
  ),
})

export type TSaveTeacherSubjectsPayload = z.infer<
  typeof saveTeacherSubjectsPayload
>

export const saveTeacherQualificationsPayload = z.object({
  qualifications: z.array(
    z.object({
      university: formRequiredString(),
      course: formRequiredString(),
      grade: formRequiredString(),
    })
  ),
  achievements: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        grade: z.string(),
      })
    )
    .optional(),
})

export type TSaveTeacherQualificationsPayload = z.infer<
  typeof saveTeacherQualificationsPayload
>

export const saveTeacherExperiencePayload = z.object({
  role: formRequiredString(),
  subRole: formRequiredString(),
  teachingTime: formRequiredString(),
  qualification: z.boolean(),
  degree: z.boolean(),
  examiner: z.boolean(),
  examBoard: z.array(z.string()).optional(),
})

export type TSaveTeacherTeachingLifePayload = z.infer<
  typeof saveTeacherExperiencePayload
>

export const saveTeacherProfilePayload = z.object({
  profilePhoto: formRequiredString(),
  about: z.any(),
  gender: formRequiredString(),
  dateOfBirth: z.string().optional(),
  title: formRequiredString(),
  socialLinks: z.array(
    z.object({
      url: formRequiredString().url(),
      platform: formRequiredString(),
    })
  ),
})

export type TSaveTeacherProfilePayload = z.infer<
  typeof saveTeacherProfilePayload
>

export const saveTeacherAvailabilityPayload = z.object({
  availabilityTable: z.object({
    morning: z.array(z.boolean()).min(7).max(7),
    afternoon: z.array(z.boolean()).min(7).max(7),
    evening: z.array(z.boolean()).min(7).max(7),
  }),
  availableNow: z.boolean(),
  startDate: z.string().nullable().optional(),
  files: z.array(
    z.object({
      name: formRequiredString(),
      content: formRequiredString(),
    })
  ),
  typeOfJob: formRequiredString(),
})

export type TSaveTeacherAvailabilityPayload = z.infer<
  typeof saveTeacherAvailabilityPayload
>

export const saveTeacherOtherServicesPayload = z.object({
  otherServices: z.array(
    z.object({
      title: formRequiredString(),
      description: formRequiredString(),
    })
  ),
})

export type TSaveTeacherOtherServices = z.infer<
  typeof saveTeacherOtherServicesPayload
>

const badgeSchema = z.object({
  name: formRequiredString(),
  content: formRequiredString(),
  fileType: formRequiredString(),
})
export const saveTeacherBadgesPayload = z.object({
  qualificationBadges: z.array(badgeSchema).optional(),
  degreeBadges: z.array(badgeSchema).optional(),
  examinerBadges: z.array(badgeSchema).optional(),
  dbsBadges: z.array(badgeSchema).optional(),
})

export type TSaveTeacherBadgesPayload = z.infer<typeof saveTeacherBadgesPayload>

// export const searchTeacherQueryPayload = z.object({
//   availability: z.array(z.string()).optional(),
//   subjects: z.array(z.string()).optional(),
//   positions: z.array(z.string()).optional(),
//   subPositions: z.array(z.string()).optional(),
// })

export const searchTeacherQueryPayload = z.object({
  filters: z.array(
    z.object({
      relation: z.string(),
      value: z.array(z.string()),
    })
  ),
  searchKeyword: z.string()?.optional(),
})

export type TSearchTeacherQueryPayload = z.infer<
  typeof searchTeacherQueryPayload
>
