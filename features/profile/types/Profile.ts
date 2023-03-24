import { Image } from '@/types/Image'
import { Experience } from './Experience'

export type Profile = {
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  firstName: string
  lastName: string
  mei: string
  sei: string
  profileImage: Image
  content?: string
  birthday: string
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
