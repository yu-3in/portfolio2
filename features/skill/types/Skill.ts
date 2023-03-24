export type Skill = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  slug: string
  description?: string
  level: number
  parent: {
    id: string
  }
}
