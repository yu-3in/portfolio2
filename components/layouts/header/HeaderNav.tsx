import { HEADER_NAV } from '@/constants/header'
import { IconButton, useMediaQuery, useTheme } from '@mui/material'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import MenuIcon from '@mui/icons-material/Menu'
import { useCallback, useState } from 'react'
import { HamButton } from '@/components/elements/button/HamButton'

export type HeaderNavProps = {}

export const HeaderNav: React.FC<HeaderNavProps> = () => {
  const { pathname } = useRouter()
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.up('md'))
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const toggleOpen = useCallback(() => setIsOpen(!isOpen), [isOpen])

  const handleClickLink = useCallback((href: string) => {
    setIsOpen(false)
    router.push(href)
  }, [])

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
        <>
          <HamButton isOpen={isOpen} onClick={toggleOpen} className="z-20" />
          <div
            className={classNames(
              'd-flex fixed top-0 z-10 h-[800px] w-[1000px] flex-col rounded-xl bg-slate-400 opacity-95',
              {
                'left-1/3 rotate-45': isOpen,
                'left-[120%]': !isOpen,
              },
            )}
            style={{
              transition:
                'transform 0.6s ease-in-out, left 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out',
              backgroundImage:
                'linear-gradient(to bottom, rgba(244, 172, 215, 0.91), rgba(246, 249, 117, 0.78))',
            }}
          >
            <nav
              className="absolute top-[66%] left-[13%] -rotate-45"
              style={{
                transition: 'left 0.6s ease-in-out,top 0.6s ease-in-out',
              }}
            >
              <ul className="flex flex-col items-center gap-6">
                {HEADER_NAV.map(({ title, link }) => (
                  <button onClick={() => handleClickLink(link)} key={title}>
                    <Link href={link}>
                      <span
                        className={classNames('text-3xl font-medium', {
                          'text-sky-500 after:mx-auto after:block after:h-0.5 after:w-10 after:bg-sky-500':
                            pathname === link,
                        })}
                      >
                        {title}
                      </span>
                    </Link>
                  </button>
                ))}
              </ul>
            </nav>
          </div>
          {isOpen && (
            // overlay
            <div
              // 画面全体を覆えるように、余裕を持った大きさに設定
              className="absolute -left-[10%] h-[200vh] w-[200%]"
              onClick={toggleOpen}
            ></div>
          )}
        </>
      )}
    </>
  )
}
