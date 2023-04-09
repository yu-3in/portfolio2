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
  variant?: 'default' | 'gradient'
}

// NOTE: 親要素にoverflow: hiddenを指定する必要がある
export const SkillGroup: React.FC<SkillGroupProps> = ({
  groupedSkill,
  index,
  reverse = false,
  className,
  variant = 'default',
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
        {
          // variant: "default"
          'flex flex-col gap-8': variant === 'default',
          'pl-12': variant === 'default' && groupedSkill.parent && md,

          // variant: "gradient"
          'relative flex items-center gap-16 md:gap-12': variant === 'gradient',
          'flex-col': variant === 'gradient' && !md,
          'flex-row-reverse': variant === 'gradient' && md && reverse,
        },
        className,
      )}
    >
      <h2
        className={classNames('flex-1 text-5xl md:text-7xl', {
          'font-bold': !groupedSkill.parent,
          'font-medium': groupedSkill.parent,

          // variant: "default"
          'text-3xl md:text-5xl': variant === 'default',
          '-ml-12': variant === 'default' && md,

          // variant: "gradient"
          'text-center text-[#044347]': variant === 'gradient',
        })}
      >
        {groupedSkill.title}
      </h2>
      <div
        className={classNames({
          // variant: "gradient"
          'relative flex  flex-1 items-center justify-center':
            variant === 'gradient',
          'h-[450px] w-[450px]': variant === 'gradient' && md,
        })}
      >
        <div
          className={classNames({
            // variant: "gradient"
            absolute: variant === 'gradient',
            'h-[350px] w-[350px]': variant === 'gradient' && !md,
            'h-[700px] w-[700px]': variant === 'gradient' && md,
          })}
          style={{
            // variant: "gradient"
            background: variant === 'gradient' ? gradationColor : undefined,
          }}
        ></div>
        <SkillList
          skills={groupedSkill.skills}
          variant={variant}
          className={classNames('relative', {
            // variant: "gradient"
            relative: variant === 'gradient',
            'gap-16': variant === 'gradient' && !md,
          })}
        />
      </div>
    </div>
  )
}
