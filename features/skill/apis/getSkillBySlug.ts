import { client } from '@/libs/api/client'
import { Skill } from '../types/Skill'

export const getSkillBySlug = async (slug: string): Promise<Skill | null> => {
  return client
    .get({
      endpoint: 'skills',
      queries: { filters: `slug[equals]${slug}`, limit: 1 },
    })
    .then((res) => res.contents[0])
    .catch((err) => err)
}
