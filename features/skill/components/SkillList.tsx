import classNames from 'classnames'
import { Fragment } from 'react'
import { Skill } from '../types'
import { SkillItem } from './SkillItem'

export type SkillListProps = { skills: Skill[]; className?: string }

export const SkillList: React.FC<SkillListProps> = ({ skills, className }) => {
  return (
    <ul
      className={classNames(
        'grid items-center justify-center gap-8',
        className,
      )}
      style={{
        gridTemplateColumns:
          'repeat(auto-fit, minmax(calc(45% / 5), calc(45% / 3)))',
      }}
    >
      {skills.map((skill) => (
        <Fragment key={skill.id}>
          <SkillItem skill={skill} />
        </Fragment>
      ))}
    </ul>
  )
}
