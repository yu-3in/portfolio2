import { Hero } from '@/features/hero/components'
import { Container } from '@/components/layouts/container/Container'
import { GradientContainer } from '@/components/layouts/container/GradientContainer'
import { SectionHeading } from '@/components/elements/heading'
import { WorkList } from '@/features/work/components'
import { GetStaticProps, NextPage } from 'next'
import { Work } from '@/features/work/types/Work'
import { getAllHighlightWorks } from '@/features/work/api/getAllHighlightWorks'
import { useState } from 'react'
import { getPlaiceholder } from 'plaiceholder'
import { addBlurDataURLToWork } from '@/features/work/libs/addBlurDataURLToWork'

export type HomeProps = {
  works: Work[] | null
}

const Home: NextPage<HomeProps> = (props) => {
  const [works, setWorks] = useState<Work[] | null>(props.works)

  return (
    <>
      <div
        className="bg-image-[url( absolute top-0 h-screen w-full"
        style={{
          backgroundImage: 'url(/hero.jpg)',
        }}
      ></div>
      <Hero />
      <GradientContainer
        fromColor="rgba(190, 255, 250, 0.51)"
        toColor="rgba(172, 240, 244, 0.91)"
        direction="to-b"
        className="relative"
      >
        <Container className="pt-16">
          <SectionHeading>Works</SectionHeading>
          <WorkList works={works} />
        </Container>
      </GradientContainer>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  let works = await getAllHighlightWorks()

  // Add blurDataURL
  works = works != null ? await addBlurDataURLToWork(works) : null

  return {
    props: { works },
  }
}
