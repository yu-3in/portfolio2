import { client } from '@/libs/api/client'
import { Work } from '../types/Work'

export const getPrevWork = async (work: Work): Promise<Work | null> => {
  return client
    .get({
      endpoint: 'works',
      queries: {
        limit: 1,
        orders: 'publishedAt',
        filters: `publishedAt[greater_than]${work.publishedAt}`,
      },
    })
    .then((res) => res.contents[0])
    .catch((err) => err)
}
