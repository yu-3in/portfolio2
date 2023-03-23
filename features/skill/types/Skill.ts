export type Skill = {
  id: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  revisedAt: Date
  title: string
  slug: string
  description?: string
  level: number
  parent: {
    id: string
  }
}
