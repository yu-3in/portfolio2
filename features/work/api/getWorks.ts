import { client } from '@/libs/api/client'
import { Work } from '../types/Work'

export const getWorks = async (): Promise<Work[] | null> => {
  return client
    .get({ endpoint: 'works', queries: { limit: 100 } })
    .then((res) => res.contents)
    .catch((err) => err)
}
