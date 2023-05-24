import { createTRPCRouter, teacherProcedure } from '~/server/api/trpc'
import { saveTeacherLocationPayload } from '~/server/api/logic/teachers/schema'
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
})
