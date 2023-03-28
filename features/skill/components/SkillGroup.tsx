import { useMediaQuery, useTheme } from '@mui/material'
import classNames from 'classnames'
import { useMemo } from 'react'
import { GroupedSkill } from '../types'
import { SkillList } from './SkillList'

export type SkillGroupProps = {
  groupedSkill: GroupedSkill
  index?: number
  reverse: boolean
  className?: string
}

// NOTE: 親要素にoverflow: hiddenを指定する必要がある
export const SkillGroup: React.FC<SkillGroupProps> = ({
  groupedSkill,
  index,
  reverse = false,
  className,
}) => {
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.up('md'))

  const gradationColor = useMemo(() => {
    switch (true) {
      case undefined:
      case index != undefined && index % 3 === 0:
        return 'radial-gradient(50% 50% at 50% 50%, #86FCEE 0%, rgba(217, 217, 217, 0) 100%)'
      case index != undefined && index % 3 === 1:
        return 'radial-gradient(50% 50% at 50% 50%, #FAEA62 0%, rgba(217, 217, 217, 0) 100%)'
      case index != undefined && index % 3 === 2:
        return 'radial-gradient(50% 50% at 50% 50%, #A1C0FC 0%, rgba(217, 217, 217, 0) 100%)'
    }
  }, [])

  return (
    <div
      className={classNames(
        'relative flex items-center gap-16 md:gap-12',
        {
          'flex-col': !md,
          'flex-row-reverse': md && reverse,
        },
        className,
      )}
    >
      <h2
        className={classNames(
          'flex-1 text-center text-5xl text-[#044347] md:text-7xl',
          {
            'font-bold': !groupedSkill.parent,
            'font-medium': groupedSkill.parent,
          },
        )}
      >
        {groupedSkill.title}
      </h2>
      <div
        className={classNames(
          'relative flex  flex-1 items-center justify-center',
          {
            'h-[450px] w-[450px]': md,
          },
        )}
      >
        <div
          className={classNames('absolute', {
            'h-[350px] w-[350px]': !md,
            'h-[700px] w-[700px]': md,
          })}
          style={{
            background: gradationColor,
          }}
        ></div>
        <SkillList
          skills={groupedSkill.skills}
          className={classNames('relative', {
            'gap-16': !md,
          })}
        />
      </div>
    </div>
  )
}
