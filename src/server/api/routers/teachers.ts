import { createTRPCRouter, teacherProcedure } from "~/server/api/trpc";
import { saveTeacherLocationPayload } from "~/server/api/logic/teachers/schema";
import { TeacherService } from '../logic/teachers'

export const  teachersRouter= createTRPCRouter({
  saveTeacherLocation: teacherProcedure.input(saveTeacherLocationPayload).mutation(async ({ input }) => {
    return TeacherService.saveTeacherLocation(input)
  })
})
