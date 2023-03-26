import { getPlaiceholder } from 'plaiceholder'
import { Skill } from '../types'

export const addBlurDataURLToSkill = async (
  skills: Skill[],
): Promise<Skill[]> => {
  return await Promise.all(
    skills.map(async (skill) => {
      if (skill?.image?.url) {
        const { base64 } = await getPlaiceholder(skill.image?.url)
        skill.image.blurDataURL = base64
      }
      return skill
    }),
  )
}
