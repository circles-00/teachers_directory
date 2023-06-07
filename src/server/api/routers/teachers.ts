import { createTRPCRouter, teacherProcedure } from '~/server/api/trpc'
import {
  saveTeacherAvailabilityPayload,
  saveTeacherBadgesPayload,
  saveTeacherExperiencePayload,
  saveTeacherLocationPayload,
  saveTeacherOtherServicesPayload,
  saveTeacherProfilePayload,
  saveTeacherQualificationsPayload,
  saveTeacherSubjectsPayload,
} from '~/server/api/logic/teachers/schema'
import { TeacherService } from '../logic/teachers'
import { updateTeacherProfileStatus } from '../logic/teachers/TeacherService'

export const teachersRouter = createTRPCRouter({
  saveLocation: teacherProcedure
    .input(saveTeacherLocationPayload)
    .mutation(({ input, ctx }) => {
      return TeacherService.saveTeacherLocation(input, ctx.user.id)
    }),
  getLocation: teacherProcedure.query(({ ctx }) => {
    return TeacherService.getTeacherLocationByTeacherId(ctx.user.id)
  }),
  saveSubjects: teacherProcedure
    .input(saveTeacherSubjectsPayload)
    .mutation(({ input, ctx }) => {
      return TeacherService.saveTeacherSubjects(input, ctx.user.id)
    }),
  getSubjects: teacherProcedure.query(({ ctx }) => {
    return TeacherService.getTeacherSubjects(ctx.user.id)
  }),
  saveQualifications: teacherProcedure
    .input(saveTeacherQualificationsPayload)
    .mutation(({ input, ctx }) => {
      return TeacherService.saveTeacherQualifications(input, ctx.user.id)
    }),
  getTeacherQualifications: teacherProcedure.query(({ ctx }) => {
    return TeacherService.getTeacherQualifications(ctx.user.id)
  }),
  saveTeacherExperience: teacherProcedure
    .input(saveTeacherExperiencePayload)
    .mutation(({ input, ctx }) => {
      return TeacherService.saveExperience(input, ctx.user.id)
    }),
  getTeacherExperience: teacherProcedure.query(({ ctx }) => {
    return TeacherService.getTeacherExperience(ctx.user.id)
  }),
  saveTeacherProfile: teacherProcedure
    .input(saveTeacherProfilePayload)
    .mutation(({ input, ctx }) => {
      return TeacherService.saveTeacherProfile(input, ctx.user.id)
    }),
  getTeacherProfile: teacherProcedure.query(({ ctx }) => {
    return TeacherService.getTeacherProfile(ctx.user.id)
  }),
  saveTeacherAvailability: teacherProcedure
    .input(saveTeacherAvailabilityPayload)
    .mutation(({ input, ctx }) => {
      return TeacherService.saveTeacherAvailability(input, ctx.user.id)
    }),
  getTeacherAvailability: teacherProcedure.query(({ ctx }) => {
    return TeacherService.getTeacherAvailability(ctx.user.id)
  }),
  saveTeacherOtherServices: teacherProcedure
    .input(saveTeacherOtherServicesPayload)
    .mutation(({ input, ctx }) => {
      return TeacherService.saveTeacherOtherServices(input, ctx.user.id)
    }),
  getTeacherOtherServices: teacherProcedure.query(({ ctx }) => {
    return TeacherService.getTeacherOtherServices(ctx.user.id)
  }),
  getTeacherProfileCompletionProgress: teacherProcedure.query(({ ctx }) => {
    return TeacherService.getTeacherProfileCompletionProgress(ctx.user.id)
  }),
  saveTeacherBadges: teacherProcedure
    .input(saveTeacherBadgesPayload)
    .mutation(({ input, ctx }) => {
      return TeacherService.saveTeacherBadges(input, ctx.user.id)
    }),
  getTeacherBadges: teacherProcedure.query(({ ctx }) => {
    return TeacherService.getTeacherBadges(ctx.user.id)
  }),
  submitProfileForReview: teacherProcedure.mutation(({ ctx }) => {
    return TeacherService.updateTeacherProfileStatus(ctx.user.id)
  }),
})
