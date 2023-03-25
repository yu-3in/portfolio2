import { client } from '@/libs/api/client'
import { Experience } from '../types/Experience'
import { Profile } from '../types/Profile'

export type getProfileProps = {
  experience?: {
    highlight?: boolean
  }
}

export const getProfileInitialProps = {
  experience: {
    highlight: false,
  },
}

export const getProfile = async ({
  experience,
}: getProfileProps = getProfileInitialProps): Promise<Profile | null> => {
  return client
    .get({ endpoint: 'profile' })
    .then((res) => {
      // order experiences
      if (res?.experiences) {
        res.experiences = (res?.experiences as Experience[]).sort((a, b) =>
          a.startDate > b.startDate ? -1 : 1,
        )
      }

      // トップページに表示するものだけ抽出するかどうか
      if (experience?.highlight) {
        res.experiences = (res.experiences as Experience[]).filter(
          (experience) => experience.highlight,
        )
      }
      return res
    })
    .catch((err) => err)
}
