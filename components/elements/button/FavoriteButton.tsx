import { Work } from '@/features/work/types/Work'
import { FavoriteBorder, Favorite } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import axios from 'axios'
import { useState, useCallback } from 'react'

export type FavoriteButtonProps = { work: Work }

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ work }) => {
  const [favoriteCountStatus, setFavoriteCountStatus] = useState('increment')

  const handleClickFavorite = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
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
    },
    [favoriteCountStatus],
  )

  return (
    <IconButton onClick={handleClickFavorite}>
      {favoriteCountStatus === 'increment' ? (
        <FavoriteBorder fontSize="large" style={{ color: '#FE6161' }} />
      ) : (
        <Favorite fontSize="large" style={{ color: '#FE6161' }} />
      )}
    </IconButton>
  )
}
