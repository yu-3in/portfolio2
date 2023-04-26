import { EmailTemplate } from '@/components/layouts/email/EmailTemplate'
import { render } from '@react-email/render'
import Joi from 'joi'
import { NextApiRequest, NextApiResponse } from 'next'

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
      // メール送信処理（SendGrid）
      const sgMail = require('@sendgrid/mail')
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      const msg = {
        to: process.env.EMAIL_ADDRESS,
        from: 'yumoto@miravy.com',
        subject: `【ポートフォリオサイト】お問い合わせ（${req.body.name}さん）`,
        html: render(EmailTemplate(req)),
      }

      try {
        await sgMail.send(msg)
        return res.status(200).json({ message: { message: 'Send Mail' } })
      } catch (error: unknown) {
        console.error(error)
        if (error instanceof Error) {
          return res.status(404).json({ message: { message: error.message } })
        }
      }
    }
  }

  return res.status(404)
}
