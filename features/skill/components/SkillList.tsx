import { useMediaQuery, useTheme } from '@mui/material'
import classNames from 'classnames'
import { Fragment } from 'react'
import { Skill } from '../types'
import { SkillItem } from './SkillItem'

export type SkillListProps = { skills: Skill[]; className?: string }

export const SkillList: React.FC<SkillListProps> = ({ skills, className }) => {
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <ul
      className={classNames(
        'grid items-center justify-center gap-8',
        className,
      )}
      style={{
        gridTemplateColumns: md
          ? 'repeat(auto-fit, minmax(calc(45% / 5), calc(45% / 3)))'
          : 'repeat(auto-fit, minmax(calc(50% / 5), calc(50% / 3)))',
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
