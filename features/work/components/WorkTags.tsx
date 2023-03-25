import { CHIP_STYLE } from '@/constants/chip'
import { Chip } from '@mui/material'
import { WorkTag } from '../types/WorkTag'

export type WorkTagsProps = {
  tags: WorkTag[]
  size?: 'small' | 'medium' | undefined
}

export const WorkTags: React.FC<WorkTagsProps> = ({
  tags,
  size = 'medium',
}) => {
  return (
    <>
      {tags.map((tag) => {
        const className = CHIP_STYLE[tag.type[0]]
        return (
          <li className="inline-block" key={tag.title}>
            <Chip
              label={tag.title}
              size={size}
              className={'items-center p-2 font-bold' + ` ${className}`}
            />
          </li>
        )
      })}
    </>
  )
}
