import { client } from '@/libs/api/client'
import { Work } from '../types/Work'

export const getAllWorkSlugs = async (): Promise<Work[] | null> => {
  return client
    .get({ endpoint: 'works', queries: { fields: ['slug'], limit: 100 } })
    .then((res) => res.contents)
    .catch((err) => err)
}
