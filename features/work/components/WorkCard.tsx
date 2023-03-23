import { CHIP_STYLE, CHIP_STYLE_OUTLINED } from '@/constants/chip'
import { Chip } from '@mui/material'
import Image from 'next/image'
import { Work } from '../types/Work'

export type WorkCardProps = {
  work: Work
}

export const WorkCard: React.FC<WorkCardProps> = ({ work }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <figure>
        {/* TODO: 画像の最適化(サイズなど) */}
        <Image
          src={work.thumbnail?.url ?? ''}
          width={parseInt(work.thumbnail?.width ?? '')}
          height={parseInt(work.thumbnail?.height ?? '')}
          alt={work.title}
          placeholder={work.thumbnail?.blurDataURL ? 'blur' : undefined}
          blurDataURL={work.thumbnail?.blurDataURL}
        />
      </figure>
      <div className="flex flex-col gap-2 gap-y-4 p-4">
        <div className="flex items-center gap-4">
          <h3 className="text-3xl font-medium">{work.title}</h3>
          <ul className="flex list-none gap-2 overflow-x-scroll">
            {work.categories.map((category) => {
              const className = CHIP_STYLE_OUTLINED['default']
              return (
                <li className="inline-block">
                  <Chip
                    label={category}
                    size="small"
                    variant="outlined"
                    className={'items-center border-2 p-2' + ` ${className}`}
                  />
                </li>
              )
            })}
          </ul>
        </div>
        <p>{work.description}</p>
        <ul className="flex list-none gap-2 overflow-x-scroll">
          {work.tags.map((tag) => {
            const className = CHIP_STYLE[tag.type[0]]
            return (
              <li className="inline-block">
                <Chip
                  label={tag.title}
                  className={'items-center p-2 font-bold' + ` ${className}`}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
