import { FavoriteButton } from '@/components/elements/button/FavoriteButton'
import { ParsedHTML } from '@/components/elements/content/parseHTML'
import { Container } from '@/components/layouts/container/Container'
import { GradientContainer } from '@/components/layouts/container/GradientContainer'
import { Footer } from '@/components/layouts/footer'
import { SkillList } from '@/features/skill/components'
import { SkillTags } from '@/features/skill/components/SkillTags'
import { getAllWorkSlugs } from '@/features/work/apis/getAllWorkSlugs'
import { getNextWork } from '@/features/work/apis/getNextWork'
import { getPrevWork } from '@/features/work/apis/getPrevWork'
import { getWorkBySlug } from '@/features/work/apis/getWorkBySlug'
import {
  WorkCard,
  WorkCategoryList,
  WorkTags,
} from '@/features/work/components'
import { WorkTitleContent } from '@/features/work/components/WorkTitleContent'
import { addBlurDataURLToWork } from '@/features/work/libs/addBlurDataURLToWork'
import { Work } from '@/features/work/types/Work'
import classNames from 'classnames'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { ParsedUrlQuery } from 'querystring'
import TwitterIcon from '@mui/icons-material/Twitter'
import { htmlToText } from '@/features/profile/libs/htmlToText'
import { useEffect, useMemo, useState } from 'react'
import { useMediaQuery, useTheme } from '@mui/material'
import LinkIcon from '@mui/icons-material/Link'
import Meta from '@/components/Meta'
import parse from 'html-react-parser'

interface IParams extends ParsedUrlQuery {
  slug: string
}

export type WorkPageProps = {
  work: Work
  prevWork: Work | null
  nextWork: Work | null
}

const WorkPage: NextPage<WorkPageProps> = ({ work, prevWork, nextWork }) => {
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.up('md'))
  // NOTE: windowのReferenceErrorを抑止するためにuseEffect内でwindowを使用
  const [url, setUrl] = useState('')
  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  const pageDesc = useMemo(() => {
    const description = parse(work.description)
    // @ts-ignore
    // NOTE: html-react-parserの返り値Elementから文字列を取得するために、強引にprops.childrenを参照している
    return typeof description === 'object' ? description.props.children : ''
  }, [])

  return (
    <GradientContainer
      fromColor="rgba(190, 255, 250, 0.51)"
      toColor="rgba(172, 240, 244, 0.91)"
      direction="to-b"
      className="relative h-full min-h-screen pt-40"
    >
      <Meta
        pageTitle={work.title}
        pageDesc={pageDesc}
        pageImg={work.coverImage?.url}
        pageImgW={parseInt(work.coverImage?.width ?? '')}
        pageImgH={parseInt(work.coverImage?.height ?? '')}
      />
      <Container>
        <div className="flex flex-col gap-5">
          <WorkCategoryList categories={work.categories} />
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl font-medium">{work.title}</h1>
            <div>
              <ParsedHTML html={work.description} />
            </div>
          </div>
          <ul className="flex list-none flex-wrap gap-4">
            <WorkTags tags={work.tags} />
          </ul>
          <div className="flex items-center gap-2 text-gray-700">
            <LinkIcon />
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {work.url}
            </a>
          </div>
        </div>
      </Container>
      <Container>
        <div className="mt-8">
          <figure>
            <Image
              src={work.thumbnail?.url ?? ''}
              width={parseInt(work.thumbnail?.width ?? '')}
              height={parseInt(work.thumbnail?.height ?? '')}
              alt={work.title}
              placeholder={work.thumbnail?.blurDataURL ? 'blur' : undefined}
              blurDataURL={work.thumbnail?.blurDataURL}
              className="rounded-2xl"
              style={{
                // layout: responsive
                width: '100%',
                height: 'auto',
                // fade in
                transition: '0.2s',
              }}
            />
          </figure>
        </div>
      </Container>

      <Container className="mt-16 flex gap-12">
        <div style={{ flex: 9 }}>
          <div className="flex flex-col gap-12">
            {work.summary && (
              <div id="概要">
                <WorkTitleContent title="概要">
                  <ParsedHTML html={work.summary} />
                </WorkTitleContent>
              </div>
            )}
            {work.issue && (
              <div id="開発動機・目的">
                <WorkTitleContent title="開発動機・目的">
                  <ParsedHTML html={work.issue} />
                </WorkTitleContent>
              </div>
            )}
            {work.duration && (
              <div id="期間">
                <WorkTitleContent title="期間">
                  <ParsedHTML html={work.duration} />
                </WorkTitleContent>
              </div>
            )}
            {work.teamStructure && (
              <div id="チーム構成">
                <WorkTitleContent title="チーム構成">
                  <ParsedHTML html={work.teamStructure} />
                </WorkTitleContent>
              </div>
            )}
            {work.role && (
              <div id="役割">
                <WorkTitleContent title="役割">
                  <ParsedHTML html={work.role} />
                </WorkTitleContent>
              </div>
            )}
            {work.point && (
              <div id="工夫したところ">
                <WorkTitleContent title="工夫したところ">
                  <ParsedHTML html={work.point} />
                </WorkTitleContent>
              </div>
            )}
            {work.impressions && (
              <div id="所感">
                <WorkTitleContent title="所感">
                  <ParsedHTML html={work.impressions} />
                </WorkTitleContent>
              </div>
            )}
          </div>
        </div>
        {md && (
          <div className="flex flex-col gap-4" style={{ flex: 3 }}>
            <WorkTitleContent title="INDEX">
              <nav>
                <ul className="flex flex-col gap-2 [&>li]:font-bold">
                  {work.summary && (
                    <li>
                      <a href="#概要">概要</a>
                    </li>
                  )}
                  {work.issue && (
                    <li>
                      <a href="#開発動機・目的">開発動機・目的</a>
                    </li>
                  )}
                  {work.duration && (
                    <li>
                      <a href="#期間">期間</a>
                    </li>
                  )}
                  {work.teamStructure && (
                    <li>
                      <a href="#チーム構成">チーム構成</a>
                    </li>
                  )}
                  {work.role && (
                    <li>
                      <a href="#役割">役割</a>
                    </li>
                  )}
                  {work.point && (
                    <li>
                      <a href="#工夫したところ">工夫したところ</a>
                    </li>
                  )}
                  {work.impressions && (
                    <li>
                      <a href="#所感">所感</a>
                    </li>
                  )}
                  {work.skills && work.skills.length > 0 && (
                    <li>
                      <a href="#スキル">スキル</a>
                    </li>
                  )}
                  {(prevWork || nextWork) && (
                    <li>
                      <a href="#ほかの Works もみる">ほかの Works もみる</a>
                    </li>
                  )}
                </ul>
              </nav>
            </WorkTitleContent>
            <div className="flex items-center gap-6">
              <div className="font-extrabold">スキ！する</div>
              <FavoriteButton work={work} count="bottom" />
            </div>
            <WorkTitleContent
              title="シェアする"
              titleSize="sm"
              className="grid w-full grid-cols-3 gap-3"
            >
              <div>
                <a
                  href={`https://twitter.com/share?url=${url}&text=【${
                    work.title
                  }】%0D%0A${htmlToText(work.description)}%0D%0A%0D%0A`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterIcon fontSize="large" className="text-[#1DA1F2]" />
                </a>
              </div>
            </WorkTitleContent>
          </div>
        )}
      </Container>

      {work.skills && work.skills.length > 0 && (
        <Container align="right" className="mt-12">
          <div id="スキル">
            <WorkTitleContent
              title="スキル"
              className={classNames('flex flex-col gap-6')}
            >
              <SkillTags skills={work.skills} />
              <SkillList skills={work.skills} variant="horizontal" />
            </WorkTitleContent>
          </div>
        </Container>
      )}
      {(prevWork || nextWork) && (
        <Container className="mt-12">
          <div id="ほかの Works もみる">
            <WorkTitleContent title="ほかの Works もみる">
              <div
                className={classNames('grid grid-cols-1 gap-8 md:grid-cols-2')}
              >
                {prevWork && (
                  <WorkCard
                    work={prevWork}
                    className="mx-auto min-w-[min(100%,400px)] max-w-[310px] sm:max-w-[380px] sm:flex-1 md:min-w-[47%]"
                  />
                )}
                {nextWork && (
                  <WorkCard
                    work={nextWork}
                    className="mx-auto min-w-[min(100%,400px)] max-w-[310px] sm:max-w-[380px] sm:flex-1 md:min-w-[47%]"
                  />
                )}
              </div>
            </WorkTitleContent>
          </div>
        </Container>
      )}

      <div className="mt-20">
        <Footer />
      </div>
    </GradientContainer>
  )
}

export default WorkPage

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const slugs: { slug: string }[] | null = await getAllWorkSlugs()
  const paths = slugs?.map((slug) => `/works/${slug.slug}`) ?? []

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<WorkPageProps, IParams> = async ({
  params,
}) => {
  const work =
    params?.slug != undefined ? await getWorkBySlug(params?.slug) : undefined

  if (work == null) {
    return {
      notFound: true,
    }
  }

  const prevWork = await getPrevWork(work)
  const nextWork = await getNextWork(work)

  // Add blurDataURL
  const workAddedBlurDataURL = (await addBlurDataURLToWork([work]))[0]
  const prevWorkAddedBlurDataURL = prevWork
    ? (await addBlurDataURLToWork([prevWork]))[0]
    : undefined
  const nextWorkAddedBlurDataURL = nextWork
    ? (await addBlurDataURLToWork([nextWork]))[0]
    : undefined

  return {
    props: {
      work: workAddedBlurDataURL,
      prevWork: prevWorkAddedBlurDataURL ?? null,
      nextWork: nextWorkAddedBlurDataURL ?? null,
    },
  }
}
