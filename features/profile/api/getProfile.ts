import { client } from '@/libs/api/client'
import { Profile } from '../types/Profile'

export const getProfile = async (): Promise<Profile | null> => {
  return client
    .get({ endpoint: 'profile' })
    .then((res) => res)
    .catch((err) => err)
}
