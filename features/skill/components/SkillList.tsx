import { Fragment } from 'react'
import { Skill } from '../types'
import { SkillItem } from './SkillItem'

export type SkillListProps = { skills: Skill[] }

export const SkillList: React.FC<SkillListProps> = ({ skills }) => {
  return (
    <ul className="grid grid-cols-5">
      {skills.map((skill) => (
        <Fragment key={skill.id}>
          <SkillItem skill={skill} />
        </Fragment>
      ))}
    </ul>
  )
}
