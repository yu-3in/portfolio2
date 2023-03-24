import { Hero } from '@/features/hero/components'
import { Container } from '@/components/layouts/container/Container'
import { GradientContainer } from '@/components/layouts/container/GradientContainer'
import { SectionHeading } from '@/components/elements/heading'
import { WorkList } from '@/features/work/components'
import { GetStaticProps, NextPage } from 'next'
import { Work } from '@/features/work/types/Work'
import { getAllHighlightWorks } from '@/features/work/api/getAllHighlightWorks'
import { useState } from 'react'
import { addBlurDataURLToWork } from '@/features/work/libs/addBlurDataURLToWork'
import { getProfile } from '@/features/profile/api/getProfile'
import { Profile } from '@/features/profile/types/Profile'
import { ExperienceList, ProfileBox } from '@/features/profile/components'
import { profile } from 'console'

export type HomeProps = {
  works: Work[] | null
  profile: Profile | null
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
      <Hero profile={props.profile} />
      <GradientContainer
        fromColor="rgba(190, 255, 250, 0.51)"
        toColor="rgba(172, 240, 244, 0.91)"
        direction="to-b"
        className="relative pt-16"
      >
        <Container>
          <SectionHeading>Works</SectionHeading>
          <WorkList works={works} />
        </Container>
      </GradientContainer>
      <GradientContainer
        fromColor="rgba(172, 240, 244, 0.91)"
        toColor="rgba(154, 158, 243, 0.31)"
        direction="to-b"
        className="pt-16"
      >
        <Container>
          <SectionHeading>Profile</SectionHeading>
          <ProfileBox />
          <ExperienceList experiences={props.profile?.experiences} />
        </Container>
      </GradientContainer>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  // works
  let works = await getAllHighlightWorks()
  // Add blurDataURL
  works = works != null ? await addBlurDataURLToWork(works) : null

  // profile
  let profile = (await getProfile()) ?? null
  // order experiences
  if (profile?.experiences) {
    profile.experiences = profile?.experiences.sort((a, b) =>
      a.startDate > b.startDate ? -1 : 1,
    )
  }

  return {
    props: { works, profile },
  }
}
