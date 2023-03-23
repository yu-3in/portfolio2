import { getPlaiceholder } from 'plaiceholder'
import { Work } from '../types/Work'

// NOTE: only thumbnail
export const addBlurDataURLToWork = async (works: Work[]): Promise<Work[]> => {
  return await Promise.all(
    works.map(async (work) => {
      if (work?.thumbnail?.url) {
        const { base64 } = await getPlaiceholder(work.thumbnail?.url)
        work.thumbnail.blurDataURL = base64
      }
      return work
    }),
  )
}
