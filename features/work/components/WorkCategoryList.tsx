import { CHIP_STYLE_OUTLINED } from '@/constants/chip'
import { Chip } from '@mui/material'
import { WorkCategory } from '../types/WorkCategory'

export type WorkCategoryListProps = {
  categories: WorkCategory[]
  size?: 'small' | 'medium' | undefined
}

export const WorkCategoryList: React.FC<WorkCategoryListProps> = ({
  categories,
  size = 'medium',
}) => {
  return (
    <>
      {categories.map((category) => {
        const className = CHIP_STYLE_OUTLINED['default']
        return (
          <li className="inline-block" key={category}>
            <Chip
              label={category}
              size={size}
              variant="outlined"
              className={'items-center border-2 p-2' + ` ${className}`}
            />
          </li>
        )
      })}
    </>
  )
}
