import { ParsedHTML } from '@/components/elements/content/parseHTML'
import Image from 'next/image'
import Link from 'next/link'
import { Work } from '../types/Work'
import { WorkCategoryList } from './WorkCategoryList'
import { WorkTags } from './WorkTags'
import { FavoriteButton } from '@/components/elements/button/FavoriteButton'
import classNames from 'classnames'

export type WorkCardProps = {
  work: Work
  className?: string
  direction?: 'row' | 'column'
}

export const WorkCard: React.FC<WorkCardProps> = ({
  work,
  direction = 'column',
  className,
}) => {
  return (
    <Link
      href={`/works/${work.slug}`}
      className={classNames(
        'flex overflow-hidden rounded-2xl bg-white shadow-md',
        {
          'flex-col': direction === 'column',
          'flex-row': direction === 'column',
        },
        className,
      )}
    >
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
              height: direction === 'column' ? '250px' : '320px',
              // fade in
              transition: '0.2s',
              objectFit: 'cover',
            }}
            sizes="50vw"
          />
        </figure>
        <div
          className={classNames(
            'absolute top-0 h-full w-full from-transparent to-white',
            {
              'bg-gradient-to-b': direction === 'column',
              'bg-gradient-to-r': direction === 'row',
            },
          )}
        ></div>
        <div
          className={classNames('absolute bottom-0', {
            'right-4': direction === 'column',
            'right-2': direction === 'row',
          })}
        >
          <FavoriteButton
            work={work}
            count={direction === 'row' ? 'right' : 'bottom'}
          />
        </div>
      </div>
      <div className="grid-template-rows-[1fr_1fr_auto] grid gap-2 gap-y-4 p-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-3xl font-medium">{work.title}</h3>
          <ul className="flex list-none gap-2">
            <WorkCategoryList categories={work.categories} size="small" />
          </ul>
        </div>
        <div>
          <ParsedHTML html={work.description} />
        </div>
        <ul className="flex list-none flex-wrap gap-2">
          <WorkTags tags={work.tags} />
        </ul>
      </div>
    </Link>
  )
}
