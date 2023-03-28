import { Skill } from './Skill'
import { SkillCategory } from './SkillCategory'

export type GroupedSkill = {
  title: string | SkillCategory
  skills: Skill[]
  parent?: string
}
