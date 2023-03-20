import { client } from '@/libs/api/client'
import { Work } from '../types/Work'

export const getHighlightWorks = async (): Promise<Work[] | null> => {
  return client
    .get({ endpoint: 'works', queries: { filters: 'highlight[equals]true' } })
    .then((res) => res.contents)
    .catch((err) => err)
}
