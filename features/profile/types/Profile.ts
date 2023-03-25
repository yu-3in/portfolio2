import { Image } from '@/types/Image'
import { Experience } from './Experience'
import { Job } from './Job'
import { Qualification } from './Qualification'

export type Profile = {
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  firstName: string
  lastName: string
  mei: string
  sei: string
  email: string
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
  jobs: Job[]
  belief?: string
  jobType?: string
  qualifications: Qualification[]
}
