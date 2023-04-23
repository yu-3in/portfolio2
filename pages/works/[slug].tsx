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
        {' '}
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
      <div className="mt-16">
        <div className="flex flex-col gap-12">
          <Container>
            <div className="flex flex-col gap-12">
              {work.content && (
                <WorkTitleContent title="概要">
                  <ParsedHTML html={work.content} />
                </WorkTitleContent>
              )}
              {work.duration && (
                <WorkTitleContent title="期間">
                  <ParsedHTML html={work.duration} />
                </WorkTitleContent>
              )}
              {work.role && (
                <WorkTitleContent title="役割">
                  <ParsedHTML html={work.role} />
                </WorkTitleContent>
              )}
              {work.impressions && (
                <WorkTitleContent title="所感">
                  <ParsedHTML html={work.impressions} />
                </WorkTitleContent>
              )}
            </div>
          </Container>
          {work.skills && work.skills.length > 0 && (
            <Container align="right">
              <WorkTitleContent
                title="スキル"
                className={classNames('flex flex-col gap-6')}
              >
                <SkillTags skills={work.skills} />
                <SkillList skills={work.skills} variant="horizontal" />
              </WorkTitleContent>
            </Container>
          )}
          {(prevWork || nextWork) && (
            <Container>
              <WorkTitleContent title="ほかの Works もみる">
                <div
                  className={classNames(
                    'grid grid-cols-1 gap-8 md:grid-cols-2',
                  )}
                >
                  {prevWork && <WorkCard work={prevWork} />}
                  {nextWork && <WorkCard work={nextWork} />}
                </div>
              </WorkTitleContent>
            </Container>
          )}
        </div>
      </div>

      <div className={classNames('pt-20')}>
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
