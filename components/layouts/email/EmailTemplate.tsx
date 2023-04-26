import { NextApiRequest } from 'next'
import { Html } from '@react-email/html'
import { Text } from '@react-email/text'
import { Heading } from '@react-email/heading'
import { Section } from '@react-email/section'
import { Link } from '@react-email/link'

export const EmailTemplate = (req: NextApiRequest) => {
  return (
    <Html lang="ja">
      <Section>
        <Heading as="h2">お問合せいただいた方の情報</Heading>
        <Text>お名前：{req.body.name}</Text>
        <Text>会社/組織：{req.body.organization}</Text>
        <Text>メールアドレス：{req.body.email}</Text>
        <Text>
          SNS：<Link href={req.body.sns}>{req.body.sns}</Link>
        </Text>
      </Section>
      <Section>
        <Heading as="h2">お問合せ内容</Heading>
        <Text>{req.body.message}</Text>
      </Section>
    </Html>
  )
}
