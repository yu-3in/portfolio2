import Link from 'next/link'
import { HeaderNav } from './HeaderNav'

export type HeaderProps = {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="fixed top-8 left-1/2 z-30 mx-auto w-10/12 -translate-x-1/2">
      <div className="rounded-[1.4rem] bg-white px-6 py-5 shadow-md">
        <div className="flex items-center justify-between">
          <Link href="/">
            <span className=" bg-gradient-to-b from-black to-[rgba(0,148,255,.5)] bg-clip-text text-2xl font-semibold tracking-wider text-transparent">
              yuuum's Portfolio
            </span>
          </Link>
          <HeaderNav />
        </div>
      </div>
    </header>
  )
}
