import { Fragment } from 'react'
import { Experience } from '../types/Experience'
import { ExperienceItem } from './ExperienceItem'

export type ExperienceListProps = { experiences: Experience[] | undefined }

export const ExperienceList: React.FC<ExperienceListProps> = ({
  experiences,
}) => {
  return (
    <ul className="flex list-none flex-col gap-8 overflow-y-hidden">
      {experiences?.map((experience) => (
        <Fragment key={experience.title}>
          <ExperienceItem experience={experience} />
        </Fragment>
      ))}
    </ul>
  )
}
