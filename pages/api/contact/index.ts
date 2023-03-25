import Joi from 'joi'
import { NextApiRequest, NextApiResponse } from 'next'

// works/1/updateFavoriteCount
// {
//   count: 1
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // validation
    const schema = Joi.object({
      name: Joi.string().required(),
      organization: Joi.string(),
      email: Joi.string().email().required(),
      sns: Joi.string(),
      message: Joi.string().required(),
    })
    const { error } = schema.validate(req.body)

    if (error) {
      // バリデーションエラーが発生した場合は、エラーメッセージを返す
      res.status(422).json({ message: error.details[0].message })
    } else {
      // バリデーションが通過した場合は、処理を続ける
      // TODO: Send Mail program
      return res.status(200).json({ message: { message: 'Send Mail' } })
    }
  }

  return res.status(404)
}
