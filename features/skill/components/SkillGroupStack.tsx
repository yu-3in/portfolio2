import { useMediaQuery, useTheme } from '@mui/material'
import classNames from 'classnames'
import { Fragment } from 'react'
import { GroupedSkill } from '../types'
import { SkillGroup } from './SkillGroup'

export type SkillGroupStackProps = { groupedSkills: GroupedSkill[] | null }

export const SkillGroupStack: React.FC<SkillGroupStackProps> = ({
  groupedSkills,
}) => {
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <div className={classNames('flex flex-col', { 'gap-24': !md })}>
      {groupedSkills?.map((groupedSkill, index) => (
        <Fragment key={groupedSkill.title}>
          <SkillGroup
            groupedSkill={groupedSkill}
            index={index}
            reverse={!(index % 2)}
          />
        </Fragment>
      ))}
    </div>
  )
}
