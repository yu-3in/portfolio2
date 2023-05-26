import Meta from '@/components/Meta'
import { ParsedHTML } from '@/components/elements/content/parseHTML'
import { Container } from '@/components/layouts/container/Container'
import { GradientContainer } from '@/components/layouts/container/GradientContainer'
import { Footer } from '@/components/layouts/footer'
import { getAllSkillSlugs } from '@/features/skill/apis/getAllSkillSlugs'
import { getSkillBySlug } from '@/features/skill/apis/getSkillBySlug'
import { addBlurDataURLToSkill } from '@/features/skill/libs/addBlurDataURLToSkill'
import { Skill } from '@/features/skill/types'
import { getWorksBySkill } from '@/features/work/apis/getWorksBySkill'
import { WorkList } from '@/features/work/components'
import { addBlurDataURLToWork } from '@/features/work/libs/addBlurDataURLToWork'
import { Work } from '@/features/work/types/Work'
import { Rating } from '@mui/material'
import classNames from 'classnames'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { ParsedUrlQuery } from 'querystring'
import { useMemo } from 'react'
import parse from 'html-react-parser'

interface IParams extends ParsedUrlQuery {
  slug: string
}

export type SkillPageProps = {
  skill: Skill
  works: Work[] | null
}

const SkillPage: React.FC<SkillPageProps> = ({ skill, works }) => {
  const pageDesc: string = useMemo(() => {
    if (skill.description) {
      const description = parse(skill.description)
      // @ts-ignore
      // NOTE: html-react-parserの返り値Elementから文字列を取得するために、強引にprops.childrenを参照している
      return typeof description === 'object' ? description.props.children : ''
    }
    return ''
  }, [])

  return (
    <GradientContainer
      fromColor="rgba(154, 158, 243, 0.31)"
      toColor="rgba(244, 172, 215, 0.91)"
      direction="to-b"
      className="relative h-full min-h-screen pt-40"
    >
      <Meta
        pageTitle={skill.title}
        pageDesc={pageDesc}
        pageImg={skill.image?.url}
        pageImgW={parseInt(skill.image?.width ?? '')}
        pageImgH={parseInt(skill.image?.height ?? '')}
      />
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col items-center justify-center gap-8">
          <h1 className="text-5xl font-medium">{skill.title}</h1>
          <figure>
            <Image
              src={skill.image.url ?? ''}
              width={parseInt(skill.image.width ?? '')}
              height={parseInt(skill.image.height ?? '')}
              alt={skill.title}
              placeholder={skill.image.blurDataURL ? 'blur' : undefined}
              blurDataURL={skill.image.blurDataURL}
            />
          </figure>
          <Rating
            value={skill.level}
            precision={0.5}
            readOnly
            color="#0094FF"
            size="large"
            className={classNames('flex justify-center')}
            style={{
              flex: 1,
            }}
          />
          <div className="w-3/4">
            <ParsedHTML html={skill.content} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">このスキルを使っているWorks</h2>
          <WorkList works={works} />
        </div>
      </Container>
      <div className="mt-20">
        <Footer />
      </div>
    </GradientContainer>
  )
}

export default SkillPage

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const slugs: { slug: string }[] | null = await getAllSkillSlugs()
  const paths = slugs?.map((slug) => `/skills/${slug.slug}`) ?? []

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<SkillPageProps, IParams> = async ({
  params,
}) => {
  const skill = params?.slug != null ? await getSkillBySlug(params?.slug) : null

  if (skill == null) {
    return {
      notFound: true,
    }
  }

  // skillを使用したworks
  const works = params?.slug != null ? await getWorksBySkill(skill) : null

  // Add blurDataURL
  const skillAddedBlurDataURL = (await addBlurDataURLToSkill([skill]))[0]
  const worksAddedBlurDataURL =
    works != null ? await addBlurDataURLToWork(works) : null

  return {
    props: {
      skill: skillAddedBlurDataURL,
      works: worksAddedBlurDataURL,
    },
  }
}
