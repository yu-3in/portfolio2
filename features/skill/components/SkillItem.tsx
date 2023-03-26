import Image from 'next/image'
import { Skill } from '../types'

export type SkillItemProps = { skill: Skill }

export const SkillItem: React.FC<SkillItemProps> = ({ skill }) => {
  return (
    <li>
      <figure>
        <Image
          src={skill.image?.url ?? ''}
          width={parseInt(skill.image?.width ?? '')}
          height={parseInt(skill.image?.height ?? '')}
          alt={skill.title}
          placeholder={skill.image?.blurDataURL ? 'blur' : undefined}
          blurDataURL={skill.image?.blurDataURL}
          style={{
            // layout: responsive
            // width: '100%',
            // height: '250px',
            // fade in
            transition: '0.2s',
            // objectFit: 'cover',
          }}
          sizes="10vw"
        />
      </figure>
    </li>
  )
}
