import { Badge } from '@mui/material'
import { Skill } from '../types'
import { Fragment } from 'react'
import { SkillTag } from './SkillTag'
import classNames from 'classnames'

export type SkillTagsProps = { skills?: Skill[] }

export const SkillTags: React.FC<SkillTagsProps> = ({ skills }) => {
  return (
    <ul className={classNames('flex flex-row flex-wrap gap-2')}>
      {skills?.map((skill) => (
        <li key={skill.id}>
          <SkillTag skill={skill} />
        </li>
      ))}
    </ul>
  )
}
