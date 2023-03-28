import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { Skill } from '../types'

export type SkillItemProps = { skill: Skill; className?: string }

export const SkillItem: React.FC<SkillItemProps> = ({ skill, className }) => {
  return (
    <li
      className={classNames(
        'flex h-full items-center justify-center',
        className,
      )}
    >
      <Link href={`/skills/${skill.slug}`}>
        <figure>
          <Image
            src={skill.image?.url ?? ''}
            width={parseInt(skill.image?.width ?? '')}
            height={parseInt(skill.image?.height ?? '')}
            alt={skill.title}
            placeholder={skill.image?.blurDataURL ? 'blur' : undefined}
            blurDataURL={skill.image?.blurDataURL}
            style={{
              // fade in
              transition: '0.2s',
            }}
            sizes="10vw"
          />
        </figure>
      </Link>
    </li>
  )
}
