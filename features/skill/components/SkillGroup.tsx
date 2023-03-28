import classNames from 'classnames'
import { GroupedSkill } from '../types'
import { SkillList } from './SkillList'

export type SkillGroupProps = {
  groupedSkill: GroupedSkill
  reverse: boolean
  className?: string
}

export const SkillGroup: React.FC<SkillGroupProps> = ({
  groupedSkill,
  reverse = false,
  className,
}) => {
  return (
    <div
      className={classNames(
        'relative flex items-center',
        {
          'flex-row-reverse': reverse,
        },
        className,
      )}
    >
      <h2
        className={classNames('flex-1 text-center text-7xl text-[#044347]', {
          'font-bold': !groupedSkill.parent,
          'font-medium': groupedSkill.parent,
        })}
      >
        {groupedSkill.title}
      </h2>
      <div className="relative flex h-[450px] w-[450px] flex-1 items-center justify-center">
        <div
          className="absolute h-[700px] w-[700px]"
          style={{
            background:
              'radial-gradient(50% 50% at 50% 50%, #86FCEE 0%, rgba(217, 217, 217, 0) 100%)',
          }}
        ></div>
        <SkillList skills={groupedSkill.skills} className="relative" />
      </div>
    </div>
  )
}
