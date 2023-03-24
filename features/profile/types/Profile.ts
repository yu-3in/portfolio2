import { Image } from '@/types/Image'
import { Experience } from './Experience'

export type Profile = {
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  revisedAt: Date
  firstName: string
  lastName: string
  mei: string
  sei: string
  profileImage: Image
  content?: string
  birthday: Date
  gender: Generator[]
  university: string
  faculty: string
  department: string
  grade: number
  twitter?: string
  github?: string
  experiences: Experience[]
  belief?: string
  jobType?: string
}
