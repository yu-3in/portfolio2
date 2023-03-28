import Image from 'next/image'
import Link from 'next/link'
import { Skill } from '../types'

export type SkillItemProps = { skill: Skill }

export const SkillItem: React.FC<SkillItemProps> = ({ skill }) => {
  return (
    <li>
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
