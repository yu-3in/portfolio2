import { GroupedSkill } from '../types'
import { SkillList } from './SkillList'

export type SkillGroupProps = { groupedSkill: GroupedSkill }

export const SkillGroup: React.FC<SkillGroupProps> = ({ groupedSkill }) => {
  return (
    <div>
      <h2>{groupedSkill.title}</h2>
      <div>
        <SkillList skills={groupedSkill.skills} />
      </div>
    </div>
  )
}
