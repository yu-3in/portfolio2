import { SectionHeading } from '@/components/elements/heading'
import { Container } from '@/components/layouts/container/Container'
import { GradientContainer } from '@/components/layouts/container/GradientContainer'
import { Footer } from '@/components/layouts/footer'
import { getAllWorks } from '@/features/work/api/getAllWorks'
import { WorkList } from '@/features/work/components'
import { addBlurDataURLToWork } from '@/features/work/libs/addBlurDataURLToWork'
import { Work } from '@/features/work/types/Work'
import { GetStaticProps, NextPage } from 'next'

export type WorksPageProps = {
  works: Work[] | null
}

const WorksPage: NextPage<WorksPageProps> = ({ works }) => {
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
      <Footer />
    </GradientContainer>
  )
}

export default WorksPage

export const getStaticProps: GetStaticProps<WorksPageProps> = async () => {
  let works = await getAllWorks()

  // Add blurDataURL
  works = works != null ? await addBlurDataURLToWork(works) : null

  return {
    props: { works },
  }
}
