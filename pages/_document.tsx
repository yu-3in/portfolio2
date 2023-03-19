import { SITE_META } from '@/constants/meta'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang={SITE_META.siteLang}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
