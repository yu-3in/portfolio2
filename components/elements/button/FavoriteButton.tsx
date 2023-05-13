import { Work } from '@/features/work/types/Work'
import { FavoriteBorder, Favorite } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import axios from 'axios'
import classNames from 'classnames'
import { useState, useCallback } from 'react'

export type FavoriteButtonProps = {
  work: Work
  count?: 'bottom' | 'right' // スキ！数の表示位置、undefinedの場合は表示しない
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  work,
  count,
}) => {
  const [favoriteCount, setFavoriteCount] = useState<number>(
    work.favoriteCount ?? 0,
  )
  const [favoriteCountStatus, setFavoriteCountStatus] = useState('increment')

  const handleClickFavorite = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      let count: number = work.favoriteCount ?? 0
      switch (favoriteCountStatus) {
        case 'increment':
          setFavoriteCount(favoriteCount ? favoriteCount + 1 : 1)
          setFavoriteCountStatus('decrement')
          count++
          break
        case 'decrement':
          setFavoriteCount(favoriteCount ? favoriteCount - 1 : 0)
          setFavoriteCountStatus('increment')
          break
      }

      await axios.put(`/api/works/updateFavoriteCount`, {
        id: work.id,
        count: count,
      })
    },
    [favoriteCountStatus],
  )

  return (
    <div
      className={classNames('flex items-center', {
        'flex-col': count === 'bottom',
        'flex-row': count === 'right',
      })}
    >
      <IconButton onClick={handleClickFavorite}>
        {favoriteCountStatus === 'increment' ? (
          <FavoriteBorder fontSize="large" style={{ color: '#FE6161' }} />
        ) : (
          <Favorite fontSize="large" style={{ color: '#FE6161' }} />
        )}
      </IconButton>
      {
        <div
          className={classNames('text-[#FE6161]', {
            '-mt-3': count === 'bottom',
            '-ml-1': count === 'right',
          })}
        >
          {favoriteCount}
        </div>
      }
    </div>
  )
}
