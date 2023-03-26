import { SectionHeading } from '@/components/elements/heading'
import { GradientContainer } from '@/components/layouts/container/GradientContainer'
import { Footer } from '@/components/layouts/footer'
import { getProfile } from '@/features/profile/apis/getProfile'
import { ExperienceList, ProfileBox } from '@/features/profile/components'
import { ProfileVision } from '@/features/profile/components/ProfileVision'
import { addBlurDataURLToProfile } from '@/features/profile/libs/addBlurDataURLToProfile'
import { Profile } from '@/features/profile/types/Profile'
import { Container } from '@mui/material'
import { GetStaticProps } from 'next'

export type ProfilePageProps = { profile: Profile | null }

const ProfilePage: React.FC<ProfilePageProps> = ({ profile }) => {
  return (
    <GradientContainer
      fromColor="rgba(172, 240, 244, 0.91)"
      toColor="rgba(154, 158, 243, 0.31)"
      direction="to-b"
      className="relative h-full min-h-screen pt-40"
    >
      <Container>
        <SectionHeading>Profile</SectionHeading>
      </Container>
      <ProfileVision vision={profile?.vision} />
      <ProfileBox profile={profile} className="mt-24" />
      <Container className="mt-16">
        <ExperienceList experiences={profile?.experiences} />
        <Footer />
      </Container>
    </GradientContainer>
  )
}

export default ProfilePage

export const getStaticProps: GetStaticProps<ProfilePageProps> = async () => {
  // profile
  let profile = await getProfile()
  // Add blurDataURL
  profile = profile != null ? await addBlurDataURLToProfile(profile) : null

  return {
    props: { profile },
  }
}
