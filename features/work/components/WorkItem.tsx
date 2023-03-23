import { Work } from '../types/Work'
import { WorkCard } from './WorkCard'

export type WorkItemProps = {
  work: Work
}

export const WorkItem: React.FC<WorkItemProps> = ({ work }) => {
  return (
    <li>
      <WorkCard work={work} />
    </li>
  )
}
