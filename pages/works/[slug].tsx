import { FavoriteButton } from '@/components/elements/button/FavoriteButton'
import { ParsedHTML } from '@/components/elements/content/parseHTML'
import { Container } from '@/components/layouts/container/Container'
import { GradientContainer } from '@/components/layouts/container/GradientContainer'
import { Footer } from '@/components/layouts/footer'
import { SkillList } from '@/features/skill/components'
import { SkillTag } from '@/features/skill/components/SkillTag'
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

interface IParams extends ParsedUrlQuery {
  slug: string
}

export type WorkPageProps = {
  work: Work
  prevWork: Work | null
  nextWork: Work | null
}

const WorkPage: NextPage<WorkPageProps> = ({ work, prevWork, nextWork }) => {
  return (
    <GradientContainer
      fromColor="rgba(190, 255, 250, 0.51)"
      toColor="rgba(172, 240, 244, 0.91)"
      direction="to-b"
      className="relative h-full min-h-screen pt-40"
    >
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
            {work.content && (
              <div id="概要">
                <WorkTitleContent title="概要">
                  <ParsedHTML html={work.content} />
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
            {work.role && (
              <div id="役割">
                <WorkTitleContent title="役割">
                  <ParsedHTML html={work.role} />
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
        <div style={{ flex: 3 }}>
          <WorkTitleContent title="INDEX">
            <nav>
              <ul className="flex flex-col gap-2 [&>li]:font-bold">
                {work.content && (
                  <li>
                    <a href="#概要">概要</a>
                  </li>
                )}
                {work.duration && (
                  <li>
                    <a href="#期間">期間</a>
                  </li>
                )}
                {work.role && (
                  <li>
                    <a href="#役割">役割</a>
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
          <div className="mt-4 flex items-center gap-2">
            <div className="font-bold">スキ！する</div>
            <FavoriteButton work={work} count="right" />
          </div>
        </div>
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
                {prevWork && <WorkCard work={prevWork} />}
                {nextWork && <WorkCard work={nextWork} />}
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
