import { Fragment } from 'react'
import { GroupedSkill } from '../types'
import { SkillGroup } from './SkillGroup'

export type SkillGroupStackProps = { groupedSkills: GroupedSkill[] | null }

export const SkillGroupStack: React.FC<SkillGroupStackProps> = ({
  groupedSkills,
}) => {
  return (
    <div className="flex flex-col gap-8">
      {groupedSkills?.map((groupedSkill) => (
        <Fragment key={groupedSkill.title}>
          <SkillGroup groupedSkill={groupedSkill} />
        </Fragment>
      ))}
    </div>
  )
}
