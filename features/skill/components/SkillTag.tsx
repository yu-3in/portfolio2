import { Chip } from '@mui/material'
import { Skill } from '../types'

export type SkillTagProps = { skill: Skill }

export const SkillTag: React.FC<SkillTagProps> = ({ skill }) => {
  return (
    <Chip
      label={skill.title}
      component="a"
      href={`/skills/${skill.slug}`}
      clickable
    />
  )
}
