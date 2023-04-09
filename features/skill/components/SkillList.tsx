import { useMediaQuery, useTheme } from '@mui/material'
import classNames from 'classnames'
import { Fragment } from 'react'
import { Skill } from '../types'
import { SkillItem } from './SkillItem'

export type SkillListProps = {
  skills: Skill[]
  className?: string
  variant?: 'default' | 'gradient'
}

export const SkillList: React.FC<SkillListProps> = ({
  skills,
  className,
  variant = 'default',
}) => {
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.up('sm'))
  const md = useMediaQuery(theme.breakpoints.up('md'))
  const lg = useMediaQuery(theme.breakpoints.up('lg'))

  return (
    <ul
      className={classNames(
        'grid items-center justify-center',
        {
          // variant: "default"
          'gap-16 md:gap-20': variant === 'default',
          'grid-cols-2': variant === 'default',
          'grid-cols-3': variant === 'default' && sm,
          'grid-cols-5': variant === 'default' && md,
          'grid-cols-6': variant === 'default' && lg,

          // variant: "gradient"
          'gap-12 md:gap-24': variant === 'gradient',
        },
        className,
      )}
      style={{
        // variant "gradient"
        gridTemplateColumns:
          variant === 'gradient' && md
            ? 'repeat(auto-fit, minmax(calc(60% / 5), calc(60% / 3)))'
            : 'repeat(auto-fit, minmax(calc(50% / 5), calc(50% / 3)))',
      }}
    >
      {skills.map((skill) => (
        <Fragment key={skill.id}>
          <SkillItem skill={skill} variant={variant} />
        </Fragment>
      ))}
    </ul>
  )
}
