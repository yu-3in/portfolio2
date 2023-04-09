import { Image } from '@/types/Image'
import { SkillCategory } from './SkillCategory'

export type Skill = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  slug: string
  image: Image
  description?: string
  content?: string
  level: number
  category: SkillCategory
  parent?: {
    id: string
  }
}
