import { Container } from '@/components/layouts/container/Container'
import { GradientContainer } from '@/components/layouts/container/GradientContainer'
import { getAllSkillSlugs } from '@/features/skill/apis/getAllSkillSlugs'
import { getSkillBySlug } from '@/features/skill/apis/getSkillBySlug'
import { addBlurDataURLToSkill } from '@/features/skill/libs/addBlurDataURLToSkill'
import { Skill } from '@/features/skill/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

interface IParams extends ParsedUrlQuery {
  slug: string
}

export type SkillPageProps = {
  skill: Skill
}

const SkillPage: React.FC<SkillPageProps> = ({ skill }) => {
  return (
    <GradientContainer
      fromColor="rgba(154, 158, 243, 0.31)"
      toColor="rgba(244, 172, 215, 0.91)"
      direction="to-b"
      className="relative h-full min-h-screen pt-40"
    >
      <Container>
        <div></div>
      </Container>
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
  const skill =
    params?.slug != undefined ? await getSkillBySlug(params?.slug) : undefined

  if (skill == null) {
    return {
      notFound: true,
    }
  }

  // Add blurDataURL
  const skillAddedBlurDataURL = (await addBlurDataURLToSkill([skill]))[0]

  return {
    props: {
      skill: skillAddedBlurDataURL,
    },
  }
}
