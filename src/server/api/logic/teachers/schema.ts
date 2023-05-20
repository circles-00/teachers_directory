import { z } from "zod";
import { ELocationType } from "@shared";

export const saveTeacherLocationPayload = z.object({
  latitude: z.number(),
  longitude: z.number(),
  description: z.string(),
  type: ELocationType
})

export type TSaveTeacherLocationPayload = z.infer<typeof saveTeacherLocationPayload>
