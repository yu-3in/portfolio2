import { client } from '@/libs/api/client'
import { Skill } from '../types'

export const getAllSkillSlugs = async (): Promise<Skill[] | null> => {
  return client
    .get({ endpoint: 'skills', queries: { fields: ['slug'], limit: 100 } })
    .then((res) => res.contents)
    .catch((err) => err)
}
