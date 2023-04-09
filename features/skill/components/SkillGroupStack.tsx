import { useMediaQuery, useTheme } from '@mui/material'
import classNames from 'classnames'
import { Fragment } from 'react'
import { GroupedSkill } from '../types'
import { SkillGroup } from './SkillGroup'

export type SkillGroupStackProps = {
  groupedSkills: GroupedSkill[] | null
  variant?: 'default' | 'gradient'
}

export const SkillGroupStack: React.FC<SkillGroupStackProps> = ({
  groupedSkills,
  variant = 'default',
}) => {
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <div
      className={classNames('flex flex-col', {
        // variant: "default"
        'gap-16': variant === 'default',

        // variant: "gradient"
        'gap-24': variant === 'gradient' && !md,
      })}
    >
      {groupedSkills?.map((groupedSkill, index) => (
        <Fragment key={groupedSkill.title}>
          <SkillGroup
            groupedSkill={groupedSkill}
            index={index}
            reverse={variant === 'gradient' && !(index % 2)}
            variant={variant}
          />
        </Fragment>
      ))}
    </div>
  )
}
