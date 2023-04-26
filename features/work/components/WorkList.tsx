import { Fragment } from 'react'
import { Work } from '../types/Work'
import { WorkCard } from './WorkCard'
import classNames from 'classnames'

export type WorkListProps = { works: Work[] | null }

export const WorkList: React.FC<WorkListProps> = ({ works }) => {
  return (
    <ul className="flex list-none flex-wrap justify-center gap-8 after:block after:min-w-[max(45%,310px)] after:max-w-[380px] after:flex-1 after:content-[''] md:after:min-w-[47%]">
      {works ? (
        works.map((work) => (
          <Fragment key={work.id}>
            <WorkCard
              work={work}
              className={classNames(
                'min-w-[max(45%,310px)] max-w-[310px] flex-none overflow-hidden rounded-2xl bg-white shadow-md  sm:max-w-[380px] sm:flex-1 md:min-w-[47%]',
              )}
            />
          </Fragment>
        ))
      ) : (
        <>Workが見つかりませんでした</>
      )}
    </ul>
  )
}
