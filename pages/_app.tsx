import { Layout } from '@/components/layouts/container'
import '@/styles/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Baloo_Thambi_2 } from 'next/font/google'

type MyAppProps = AppProps & {
  Component: NextPage & {
    getLayout?: (page: React.ReactNode) => React.ReactNode
  }
}

const balooThambi2 = Baloo_Thambi_2({ subsets: ['latin'] })

export default function App({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page)

  return (
    <Layout className={balooThambi2.className}>
      {getLayout(<Component {...pageProps} />)}
    </Layout>
  )
}
