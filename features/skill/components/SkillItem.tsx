import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { Skill } from '../types'
import { Rating, useMediaQuery, useTheme } from '@mui/material'
import { ParsedHTML } from '@/components/elements/content/parseHTML'

export type SkillItemProps = {
  skill: Skill
  className?: string
  variant?: 'default' | 'gradient'
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
          // variant: "default"
          'h-full': variant === 'default',

          // variant: "gradient"
          'flex h-full items-center justify-center': variant === 'gradient',
        },
        className,
      )}
    >
      <Link
        href={`/skills/${skill.slug}`}
        className={classNames({
          // variant: "default"
          'flex h-full flex-col justify-between gap-2': variant === 'default',
        })}
      >
        <figure
          className={classNames({
            //variant: "default"
            'h-[70px]': variant === 'default',
            'h-[130px]': variant === 'default' && md,
            // 'min-h-full': variant === 'default',
          })}
          style={{
            // variant: "default"
            flex: variant === 'default' ? 4 : undefined,
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
              //variant: "default"
              'h-[70px]': variant === 'default',
              'h-[130px]': variant === 'default' && md,
              // 'min-h-full': variant === 'default',
            })}
            style={{
              // fade in
              transition: '0.2s',
            }}
            sizes="10vw"
          />
        </figure>
        {variant === 'default' && (
          <>
            <div
              className={classNames({
                // variant: "default"
                'flex items-center justify-center': variant === 'default',
              })}
              style={{
                // variant: "default"
                flex: variant === 'default' ? 4 : undefined,
              }}
            >
              <h3
                className={classNames({
                  // variant: "default"
                  'text-center text-2xl font-semibold': variant === 'default',
                })}
              >
                {skill.title}
              </h3>
            </div>

            <Rating
              value={skill.level}
              precision={0.5}
              readOnly
              color="#0094FF"
              size={md ? 'small' : 'medium'}
              className={classNames({
                // variant: "default"
                'flex justify-center': variant === 'default',
              })}
              style={{
                // variant: "default"
                flex: variant === 'default' ? 1 : undefined,
              }}
            />

            {/* <div
              style={{
                // variant: "default"
                flex: variant === 'default' ? 3 : undefined,
                // flexBasis: variant === 'default' ? '2em' : undefined,
                // overflow: 'hidden',
              }}
            >
              <ParsedHTML html={skill?.description} />
            </div> */}
          </>
        )}
      </Link>
    </li>
  )
}
