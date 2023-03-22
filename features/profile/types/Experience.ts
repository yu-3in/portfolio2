import { Image } from '@/types/Image'
import { ExperienceType } from './ExperienceType'

export type Experience = {
  fieldId: 'experiences'
  title: string
  subTitle?: string
  image?: Image
  type: ExperienceType[]
  startDate: Date
  endDate?: Date
  description?: string
  highlight: boolean
}
