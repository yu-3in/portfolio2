import { Fragment } from 'react'
import { GroupedSkill } from '../types'
import { SkillGroup } from './SkillGroup'

export type SkillGroupStackProps = { groupedSkills: GroupedSkill[] | null }

export const SkillGroupStack: React.FC<SkillGroupStackProps> = ({
  groupedSkills,
}) => {
  // TODO: サブグループをフラット化する
  return (
    <div className="flex flex-col">
      {groupedSkills?.map((groupedSkill, index) => (
        <Fragment key={groupedSkill.title}>
          <SkillGroup
            groupedSkill={groupedSkill}
            reverse={!(index % 2)}
            className="-my-16"
          />
        </Fragment>
      ))}
    </div>
  )
}
