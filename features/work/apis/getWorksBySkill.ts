import { client } from '@/libs/api/client'
import { Work } from '../types/Work'
import { Skill } from '@/features/skill/types'

export const getWorksBySkill = async (skill: Skill): Promise<Work[] | null> => {
  return client
    .get({
      endpoint: 'works',
      queries: {
        limit: 100,
        filters: `skills[contains]${skill.id}`,
      },
    })
    .then((res) => res.contents)
    .catch((err) => err)
}
