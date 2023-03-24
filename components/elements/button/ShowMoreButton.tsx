import { Button } from '@mui/material'
import Link from 'next/link'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

export type ShowMoreButtonProps = { href: string; children?: React.ReactNode }

export const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({
  href,
  children = 'もっとみる',
}) => {
  return (
    <Link href={href}>
      <Button className="flex items-center justify-evenly gap-2 rounded-full border-[3px] border-solid border-[#2DA7FF] bg-white py-3 pl-10 pr-6 text-[1.1em] font-bold text-[#0080DD] hover:bg-[rgba(255,255,255,.5)]">
        <span>{children}</span>
        <KeyboardArrowRightIcon className="font-bold" />
      </Button>
    </Link>
  )
}
