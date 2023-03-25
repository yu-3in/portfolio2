import { useMediaQuery, useTheme } from '@mui/material'
import classNames from 'classnames'
import Link from 'next/link'
import { useState } from 'react'
import { HeaderNav } from './HeaderNav'

export type HeaderProps = {}

export const Header: React.FC<HeaderProps> = () => {
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.up('md'))
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false)

  return (
    <header>
      <div
        className={classNames(
          'fixed left-1/2 right-1/2 z-30 mx-auto -translate-x-1/2',
          {
            'top-4 w-11/12': !md,
            'top-8 w-10/12': md,
          },
        )}
      >
        <div
          className={classNames('rounded-full bg-white shadow-md', {
            'px-6 py-1': !md,
            'px-6 py-5': md,
          })}
        >
          <div className="flex items-center justify-between">
            <Link href="/">
              <span className=" bg-gradient-to-b from-black to-[rgba(0,148,255,.5)] bg-clip-text text-2xl font-semibold tracking-wider text-transparent">
                {md && "yuuum's "}Portfolio
              </span>
            </Link>
            <HeaderNav />
          </div>
        </div>
      </div>
      {/* <div
        className="fixed -right-[20%] z-20 h-[130%] w-[70%]"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, #00DACD 50%, rgba(217, 217, 217, 0) 100%)',
        }}
      ></div> */}
    </header>
  )
}
