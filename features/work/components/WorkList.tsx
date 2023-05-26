import { Fragment } from 'react'
import { Work } from '../types/Work'
import { WorkCard } from './WorkCard'
import classNames from 'classnames'

export type WorkListProps = { works: Work[] | null }

export const WorkList: React.FC<WorkListProps> = ({ works }) => {
  return (
    <ul className="flex list-none flex-wrap justify-center gap-6 after:block after:min-w-[min(100%,400px)] after:max-w-[380px] after:flex-1 after:content-[''] md:after:min-w-[47%] lg:gap-8">
      {works ? (
        works.map((work) => (
          <Fragment key={work.id}>
            <WorkCard
              work={work}
              className={classNames(
                'min-w-[min(100%,400px)] max-w-[310px] flex-none overflow-hidden rounded-2xl bg-white shadow-md  sm:max-w-[380px] sm:flex-1 md:min-w-[47%]',
              )}
              fadeIn={true}
            />
          </Fragment>
        ))
      ) : (
        <>Workが見つかりませんでした</>
      )}
    </ul>
  )
}
