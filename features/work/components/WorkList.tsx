import { Work } from '../types/Work'
import { WorkItem } from './WorkItem'

export type WorkListProps = { works: Work[] | null }

export const WorkList: React.FC<WorkListProps> = ({ works }) => {
  return (
    <ul className="xs:grid-cols-1 grid list-none gap-8 sm:grid-cols-2 2xl:grid-cols-3">
      {works ? (
        works.map((work) => <WorkItem key={work.id} work={work} />)
      ) : (
        <>Workが見つかりませんでした</>
      )}
    </ul>
  )
}
