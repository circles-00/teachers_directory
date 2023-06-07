import { z } from 'zod'
import { formRequiredString, getMonthNumberFromName } from '@utils'
import { EErrorLabels } from './error-labels'
import isEmpty from 'lodash.isempty'

export const validationSchema = z
  .object({
    profilePhoto: formRequiredString({
      required_error: EErrorLabels.profilePhoto,
      invalid_type_error: EErrorLabels.profilePhoto,
    }),
    about: z.any(),
    gender: formRequiredString(),
    dateOfBirth: z.string().optional(),
    day: formRequiredString(),
    month: formRequiredString(),
    year: formRequiredString(),
    title: formRequiredString({ required_error: EErrorLabels.profileTitle }),
    socialLinks: z.array(
      z.object({
        url: formRequiredString({
          required_error: EErrorLabels.socialPlatformUrl,
        }).url(),
        platform: formRequiredString(),
      })
    ),
  })
  .refine((data) => {
    if (!isEmpty(data.day) && !isEmpty(data.month) && !isEmpty(data.year)) {
      data.dateOfBirth = `${data.day}/${getMonthNumberFromName(data.month)}/${
        data.year
      }`
    }

    return data
  })

export type TSchema = z.infer<typeof validationSchema>
