import { HEADER_NAV } from '@/constants/header'
import { IconButton, useMediaQuery, useTheme } from '@mui/material'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import MenuIcon from '@mui/icons-material/Menu'

export type HeaderNavProps = {}

export const HeaderNav: React.FC<HeaderNavProps> = () => {
  const { pathname } = useRouter()
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <>
      {md ? (
        <nav className="flex items-center gap-8">
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
        </nav>
      ) : (
        <IconButton>
          <MenuIcon />
        </IconButton>
      )}
    </>
  )
}
