import { Work } from '../types/Work'
import { WorkCard } from './WorkCard'
import { useMediaQuery, useTheme } from '@mui/material'

export type WorkListProps = { works: Work[] | null }

export const WorkList: React.FC<WorkListProps> = ({ works }) => {
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <ul className="flex list-none flex-wrap justify-center gap-8 after:block after:content-['']">
      {works ? (
        works.map((work) => (
          <li
            key={work.id}
            className="mr-auto flex-1"
            style={{
              minWidth: sm ? 'max(45%, 330px)' : 'max(45%, 300px)',
              maxWidth: '380px',
            }}
          >
            <WorkCard work={work} />
          </li>
        ))
      ) : (
        <>Workが見つかりませんでした</>
      )}
    </ul>
  )
}
