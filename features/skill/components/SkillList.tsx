import { useMediaQuery, useTheme } from '@mui/material'
import classNames from 'classnames'
import { Fragment, useMemo } from 'react'
import { Skill } from '../types'
import { SkillItem } from './SkillItem'

export type SkillListProps = {
  skills: Skill[]
  className?: string
  variant?: Variant
}

export type Variant = 'default' | 'gradient' | 'horizontal'

export const SkillList: React.FC<SkillListProps> = ({
  skills,
  className,
  variant = 'default',
}) => {
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.up('sm'))
  const md = useMediaQuery(theme.breakpoints.up('md'))
  const lg = useMediaQuery(theme.breakpoints.up('lg'))

  const gridTemplateColumns = useMemo(() => {
    switch (variant) {
      case 'gradient':
        if (md) {
          return 'repeat(auto-fit, minmax(calc(60% / 5), calc(60% / 3)))'
        } else {
          return 'repeat(auto-fit, minmax(calc(50% / 5), calc(50% / 3)))'
        }
      case 'default':
        return 'repeat(auto-fit, minmax(calc(50% / 5), calc(50% / 3)))'
      default:
        return undefined
    }
  }, [variant, md])

  return (
    <ul
      className={classNames(
        {
          // variant: "default"
          'grid items-center justify-center gap-16 md:gap-20':
            variant === 'default',
          'grid-cols-2': variant === 'default',
          'grid-cols-3': variant === 'default' && sm,
          'grid-cols-5': variant === 'default' && md,
          'grid-cols-6': variant === 'default' && lg,

          // variant: "gradient"
          'grid items-center justify-center gap-12 md:gap-24':
            variant === 'gradient',

          // variant: "horizontal"
          'flex flex-row flex-nowrap items-center justify-start gap-12 overflow-x-auto [&>li]:max-w-[150px]':
            variant === 'horizontal',
        },
        className,
      )}
      style={{
        gridTemplateColumns: gridTemplateColumns,
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
