import {
  type User,
  type TeacherLocation,
  type File,
  type Prisma,
} from '@prisma/client'

export type TUser = User

export type TTeacher = Prisma.TeacherGetPayload<{
  include: {
    subjects: true
    otherServices: true
    experience: true
    location: true
    availability: true
    user: true
  }
}>

export type TTeacherLocation = TeacherLocation

export type TFile = File
