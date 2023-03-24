import { ParsedHTML } from '@/components/elements/content/parseHTML'
import { formatDate } from '@/features/work/libs/formatDate'
import Image from 'next/image'
import { useMemo } from 'react'
import { Experience } from '../types/Experience'
import SchoolIcon from '@mui/icons-material/School'

export type ExperienceItemProps = { experience: Experience }

const imageSize = '4em'

export const ExperienceItem: React.FC<ExperienceItemProps> = ({
  experience,
}) => {
  const formattedStartDate = useMemo(
    () => formatDate(new Date(experience.startDate), 'YYYY/MM'),
    [experience.startDate],
  )

  return (
    <li>
      <div className="flex gap-4">
        <div className="after:h-[calc(100% + 5em)] relative flex basis-2/12 justify-center after:absolute after:left-1/2 after:right-1/2 after:-top-5 after:-bottom-5 after:-z-10 after:inline-block after:w-1 after:-translate-x-1/2 after:bg-blue-500">
          {experience.image ? (
            <figure>
              <Image
                src={experience.image?.url ?? ''}
                width={parseInt(experience.image?.width ?? '')}
                height={parseInt(experience.image?.height ?? '')}
                alt={experience.title}
                placeholder={experience.image?.blurDataURL ? 'blur' : undefined}
                blurDataURL={experience.image?.blurDataURL}
                className="rounded-full"
                style={{
                  // layout: responsive
                  width: imageSize,
                  height: imageSize,
                  // fade in
                  transition: '0.2s',
                  objectFit: 'cover',
                }}
                sizes="8em"
              />
            </figure>
          ) : (
            <div
              className="flex items-center justify-center rounded-full bg-sky-300"
              style={{
                width: imageSize,
                height: imageSize,
              }}
            >
              <SchoolIcon fontSize="large" />
            </div>
          )}
        </div>
        <div className="basis-10/12">
          <time dateTime={formattedStartDate}>{formattedStartDate}</time>
          <h3 className="text-xl font-bold">{experience.title}</h3>
          <div className="text-sm text-gray-500">{experience.subTitle}</div>
          {experience.description && (
            <div className="mt-1">
              <ParsedHTML html={experience.description} />
            </div>
          )}
        </div>
      </div>
    </li>
  )
}
