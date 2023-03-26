import { client } from '@/libs/api/client'
import { Skill } from '../types'

export const getSkills = async (): Promise<Skill[] | null> => {
  return client
    .get({ endpoint: 'skills', queries: { limit: 100 } })
    .then((res) => res.contents)
    .catch((err) => err)
}
