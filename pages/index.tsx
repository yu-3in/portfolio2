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
import { ShowMoreButton } from '@/components/elements/button'
import { getPlaiceholder } from 'plaiceholder'
import { ContactForm } from '@/features/contact/components'
import { Footer } from '@/components/layouts/footer'

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
          <div className="mt-16 flex justify-center">
            <ShowMoreButton href="/works" />
          </div>
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
        </Container>
        <ProfileBox profile={props.profile} />
        <Container className="mt-16">
          <ExperienceList experiences={props.profile?.experiences} />
          <div className="mt-12 flex justify-center">
            <ShowMoreButton href="/profile" />
          </div>
        </Container>
      </GradientContainer>
      <GradientContainer
        fromColor="rgba(154, 158, 243, 0.31)"
        toColor="rgba(244, 172, 215, 0.91)"
        direction="to-b"
        className="pt-16"
      >
        <Container>
          <SectionHeading>Skills</SectionHeading>
          <div className="h-screen"></div>
        </Container>
      </GradientContainer>
      <GradientContainer
        fromColor="rgba(244, 172, 215, 0.91)"
        toColor="rgba(246, 249, 117, 0.78)"
        direction="to-b"
        className="pt-16"
      >
        <Container>
          <SectionHeading>Contact</SectionHeading>
          <ContactForm />
        </Container>
        <Footer />
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
  // Add blurDataURL
  if (profile?.profileImage) {
    const { base64: profileImageBase64 } = await getPlaiceholder(
      profile?.profileImage.url,
    )
    profile.profileImage.blurDataURL = profileImageBase64
  }

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
