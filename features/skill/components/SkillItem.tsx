import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { Skill } from '../types'
import { Rating, useMediaQuery, useTheme } from '@mui/material'
import { ParsedHTML } from '@/components/elements/content/parseHTML'

export type SkillItemProps = {
  skill: Skill
  className?: string
  variant?: 'default' | 'gradient' | 'horizontal'
}

export const SkillItem: React.FC<SkillItemProps> = ({
  skill,
  className,
  variant = 'default',
}) => {
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <li
      className={classNames(
        {
          // variant: "default" || 'horizontal'
          'h-full': variant === 'default' || variant === 'horizontal',

          // variant: "gradient"
          'flex h-full items-center justify-center': variant === 'gradient',
        },
        className,
      )}
    >
      <Link
        href={`/skills/${skill.slug}`}
        className={classNames({
          // variant: "default" || "horizontal"
          'flex h-full flex-col justify-between gap-2':
            variant === 'default' || variant === 'horizontal',
        })}
      >
        <figure
          className={classNames({
            //variant: "default" || 'horizontal'
            'h-[70px]': variant === 'default' || variant === 'horizontal',
            'h-[130px]':
              (variant === 'default' || variant === 'horizontal') && md,
            // 'min-h-full': variant === 'default' || variant === 'horizontal',
          })}
          style={{
            // variant: "default" || 'horizontal'
            flex:
              variant === 'default' || variant === 'horizontal' ? 4 : undefined,
          }}
        >
          <Image
            src={skill.image?.url ?? ''}
            width={parseInt(skill.image?.width ?? '')}
            height={parseInt(skill.image?.height ?? '')}
            alt={skill.title}
            placeholder={skill.image?.blurDataURL ? 'blur' : undefined}
            blurDataURL={skill.image?.blurDataURL}
            className={classNames({
              //variant: "default" || 'horizontal'
              'h-[70px]': variant === 'default' || variant === 'horizontal',
              'h-[130px]':
                variant === 'default' || (variant === 'horizontal' && md),
              // 'min-h-full': variant === 'default' || variant === 'horizontal',
            })}
            style={{
              // fade in
              transition: '0.2s',
            }}
            sizes="10vw"
          />
        </figure>
        {(variant === 'default' || variant === 'horizontal') && (
          <>
            <div
              className={classNames('flex items-center justify-center')}
              style={{
                flex: 4,
              }}
            >
              <h3 className={classNames('text-center text-2xl font-semibold')}>
                {skill.title}
              </h3>
            </div>

            <Rating
              value={skill.level}
              precision={0.5}
              readOnly
              color="#0094FF"
              size={md ? 'small' : 'medium'}
              className={classNames('flex justify-center')}
              style={{
                flex: 1,
              }}
            />

            <div
              style={{
                flex: 3,
                // flexBasis: '2em',
                // overflow: 'hidden',
              }}
            >
              <div
                className={classNames(
                  'h-14 overflow-y-hidden text-ellipsis text-sm',
                )}
              >
                <ParsedHTML html={skill?.description} />
              </div>
            </div>
          </>
        )}
      </Link>
    </li>
  )
}
