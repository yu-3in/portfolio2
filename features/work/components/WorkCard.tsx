import { CHIP_STYLE, CHIP_STYLE_OUTLINED } from '@/constants/chip'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { Chip, IconButton } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { Work } from '../types/Work'

export type WorkCardProps = {
  work: Work
}

export const WorkCard: React.FC<WorkCardProps> = ({ work }) => {
  const [favoriteCountStatus, setFavoriteCountStatus] = useState('increment')

  const handleClickFavorite = useCallback(async () => {
    let count = work.favoriteCount ?? 0
    switch (favoriteCountStatus) {
      case 'increment':
        setFavoriteCountStatus('decrement')
        count++
        break
      case 'decrement':
        setFavoriteCountStatus('increment')
        break
    }

    await axios.put(`/api/works/updateFavoriteCount`, {
      id: work.id,
      count: count,
    })
  }, [favoriteCountStatus])

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md">
      <div className="relative">
        <figure>
          <Image
            src={work.thumbnail?.url ?? ''}
            width={parseInt(work.thumbnail?.width ?? '')}
            height={parseInt(work.thumbnail?.height ?? '')}
            alt={work.title}
            placeholder={work.thumbnail?.blurDataURL ? 'blur' : undefined}
            blurDataURL={work.thumbnail?.blurDataURL}
            style={{
              // layout: responsive
              width: '100%',
              height: 'auto',
              // fade in
              transition: '0.2s',
            }}
            sizes="50vw"
          />
        </figure>
        <div className="absolute top-0 h-full w-full bg-gradient-to-b from-transparent to-white"></div>
        <div className="absolute bottom-0 right-2">
          <IconButton onClick={handleClickFavorite}>
            {favoriteCountStatus === 'increment' ? (
              <FavoriteBorder fontSize="large" style={{ color: '#FE6161' }} />
            ) : (
              <Favorite fontSize="large" style={{ color: '#FE6161' }} />
            )}
          </IconButton>
        </div>
      </div>
      <div className="flex flex-col gap-2 gap-y-4 p-5">
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
