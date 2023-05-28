import { createTRPCRouter, teacherProcedure } from '~/server/api/trpc'
import {
  saveTeacherLocationPayload,
  saveTeacherQualificationsPayload,
  saveTeacherSubjectsPayload,
} from '~/server/api/logic/teachers/schema'
import { TeacherService } from '../logic/teachers'

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
})
