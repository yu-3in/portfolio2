import { Experience } from '../types/Experience'
import { ExperienceItem } from './ExperienceItem'

export type ExperienceListProps = { experiences: Experience[] | undefined }

export const ExperienceList: React.FC<ExperienceListProps> = ({
  experiences,
}) => {
  return (
    <ul className="flex list-none flex-col gap-10 overflow-y-hidden">
      {experiences?.map((experience) => (
        <ExperienceItem experience={experience} />
      ))}
    </ul>
  )
}
