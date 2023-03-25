import { client } from '@/libs/api/client'
import { Work } from '../types/Work'

export const getWorkBySlug = async (slug: string): Promise<Work | null> => {
  return client
    .get({
      endpoint: 'works',
      queries: { filters: `slug[equals]${slug}`, limit: 1 },
    })
    .then((res) => res.contents[0])
    .catch((err) => err)
}
