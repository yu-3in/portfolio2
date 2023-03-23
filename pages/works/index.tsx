import { SectionHeading } from '@/components/elements/heading'
import { Container } from '@/components/layouts/container/Container'
import { GradientContainer } from '@/components/layouts/container/GradientContainer'
import { getWorks } from '@/features/work/api/getWorks'
import { WorkList } from '@/features/work/components'
import { Work } from '@/features/work/types/Work'
import { GetStaticProps } from 'next'
import { getPlaiceholder } from 'plaiceholder'

export type WorksPageProps = {
  works: Work[] | null
}

const WorksPage: React.FC<WorksPageProps> = ({ works }) => {
  return (
    <GradientContainer
      fromColor="rgba(190, 255, 250, 0.51)"
      toColor="rgba(172, 240, 244, 0.91)"
      direction="to-b"
      className="relative h-full min-h-screen pt-40"
    >
      <Container className="pb-20">
        <SectionHeading>Works</SectionHeading>
        <WorkList works={works} />
      </Container>
    </GradientContainer>
  )
}

export default WorksPage

export const getStaticProps: GetStaticProps<WorksPageProps> = async () => {
  let works = await getWorks()

  // Add blurDataURL
  works =
    works != null
      ? await Promise.all(
          works.map(async (work) => {
            if (work?.thumbnail?.url) {
              const { base64 } = await getPlaiceholder(work.thumbnail?.url)
              work.thumbnail.blurDataURL = base64
            }
            return work
          }),
        )
      : null

  return {
    props: { works },
  }
}
