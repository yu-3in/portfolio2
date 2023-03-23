import { Work } from '@/features/work/types/Work'
import { client } from '@/libs/api/client'
import { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  work: Work
}

// works/1/updateFavoriteCount
// {
//   count: 1
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'PUT') {
    const { id, count } = req.body
    const work: Work = (await client.update({
      endpoint: 'works',
      contentId: id,
      content: {
        favoriteCount: count,
      },
    })) as Work
    console.log(work)
    return res.status(200).json({ work: work })
  }

  return res.status(404)
}
