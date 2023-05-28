import { z } from 'zod'
import { formRequiredString } from '@utils'
import { EErrorLabels } from '@domains/sign-up/components/TeachersFlow/components/QualificationsQuestionnaire/validation/error-labels'

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
      course: formRequiredString({
        required_error: EErrorLabels.qualifications.course,
      }),
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
  about: formRequiredString(),
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
