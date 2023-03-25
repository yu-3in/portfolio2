import { getPlaiceholder } from 'plaiceholder'
import { Profile } from '../types/Profile'

export const addBlurDataURLToProfile = async (
  profile: Profile,
): Promise<Profile> => {
  // Add blurDataURL
  if (profile?.profileImage) {
    const { base64: profileImageBase64 } = await getPlaiceholder(
      profile?.profileImage.url,
    )
    profile.profileImage.blurDataURL = profileImageBase64
  }
  return profile
}
