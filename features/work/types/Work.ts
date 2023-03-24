import { Skill } from '@/features/skill/types/Skill'
import { Image } from '@/types/Image'
import { WorkCategory } from './WorkCategory'
import { WorkTag } from './WorkTag'

export type Work = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  slug: string
  description: string
  content?: string
  categories: WorkCategory[]
  tags: WorkTag[]
  role?: string
  skills?: Skill[]
  impressions?: string
  coverImage?: Image
  thumbnail?: Image
  startDate: string
  endDate?: string
  duration?: string
  favoriteCount?: number
  highlight: boolean
}
