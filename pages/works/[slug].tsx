import { ParsedHTML } from '@/components/elements/content/parseHTML'
import { Container } from '@/components/layouts/container/Container'
import { GradientContainer } from '@/components/layouts/container/GradientContainer'
import { getAllWorkSlugs } from '@/features/work/api/getAllWorkSlugs'
import { getWorkBySlug } from '@/features/work/api/getWorkBySlug'
import { WorkCategoryList, WorkTags } from '@/features/work/components'
import { addBlurDataURLToWork } from '@/features/work/libs/addBlurDataURLToWork'
import { Work } from '@/features/work/types/Work'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { ParsedUrlQuery } from 'querystring'

interface IParams extends ParsedUrlQuery {
  slug: string
}

export type WorkPageProps = {
  work: Work
}

const WorkPage: NextPage<WorkPageProps> = ({ work }) => {
  return (
    <GradientContainer
      fromColor="rgba(190, 255, 250, 0.51)"
      toColor="rgba(172, 240, 244, 0.91)"
      direction="to-b"
      className="relative h-full min-h-screen pt-40"
    >
      <Container className="pb-20">
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
        <div className="mt-16">
          <div className="flex flex-col gap-12">
            {work.content && (
              <div>
                <h2 className="mb-4 text-2xl font-bold">概要</h2>
                <div className="ml-2">
                  <ParsedHTML html={work.content} />
                </div>
              </div>
            )}
            {work.duration && (
              <div>
                <h2 className="mb-4 text-2xl font-bold">期間</h2>
                <div className="ml-2">
                  <ParsedHTML html={work.duration} />
                </div>
              </div>
            )}
            {work.role && (
              <div>
                <h2 className="mb-4 text-2xl font-bold">役割</h2>
                <div className="ml-2">
                  <ParsedHTML html={work.role} />
                </div>
              </div>
            )}
            {work.impressions && (
              <div>
                <h2 className="mb-4 text-2xl font-bold">所感</h2>
                <div className="ml-2">
                  <ParsedHTML html={work.impressions} />
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
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
  // TODO: prev, next works

  if (work == null) {
    return {
      notFound: true,
    }
  }

  // Add blurDataURL
  const workAddedBlurDataURL = (await addBlurDataURLToWork([work]))[0]

  return {
    props: { work: workAddedBlurDataURL },
  }
}
