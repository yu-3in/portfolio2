import { HEADER_NAV } from '@/constants/header'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

export type HeaderNavProps = {}

export const HeaderNav: React.FC<HeaderNavProps> = () => {
  const { pathname } = useRouter()
  return (
    <div className="flex items-center gap-8">
      {HEADER_NAV.map(({ title, link }) => (
        <Link href={link} key={title}>
          <span
            className={classNames('text-2xl font-medium', {
              'text-sky-500 after:mx-auto after:block after:h-0.5 after:w-10 after:bg-sky-500':
                pathname === link,
            })}
          >
            {title}
          </span>
        </Link>
      ))}
    </div>
  )
}
