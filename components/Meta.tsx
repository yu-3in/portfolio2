import { siteMeta } from '@/constants/meta'
import Head from 'next/head'
import { useRouter } from 'next/router'
import siteImg from '@/images/ogp.jpg'

interface Props {
  pageTitle?: string
  pageDesc?: string
  pageImg?: string
  pageImgW?: number
  pageImgH?: number
}
const Meta: React.FC<Props> = ({
  pageTitle,
  pageDesc,
  pageImg,
  pageImgW,
  pageImgH,
}) => {
  const router = useRouter()
  const url = `${siteMeta.siteUrl}${router.asPath}`

  const title = pageTitle
    ? `${pageTitle} | ${siteMeta.siteTitle}`
    : siteMeta.siteTitle
  const desc = pageDesc ?? siteMeta.siteDesc
  const img = pageImg || siteImg.src
  const imgW = (pageImgW || siteImg.width).toString()
  const imgH = (pageImgH || siteImg.height).toString()
  const imgUrl = img.startsWith('https') ? img : `${siteMeta.siteUrl}${img}`

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />

      <meta name="description" content={desc} />
      <meta property="og:description" content={desc} />

      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />

      <meta property="og:site_name" content={siteMeta.siteTitle} />
      <meta property="og:type" content={siteMeta.siteType} />
      <meta property="og:locale" content={siteMeta.siteLocale} />

      <link rel="icon" href={siteMeta.siteIcon} />
      <link rel="apple-touch-icon" href={siteMeta.siteIcon} />

      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content={imgW} />
      <meta property="og:image:height" content={imgH} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="theme-color" content="#BEFFFA" />
    </Head>
  )
}

export default Meta
