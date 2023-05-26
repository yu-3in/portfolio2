import TwitterIcon from '@mui/icons-material/Twitter'
import GitHubIcon from '@mui/icons-material/GitHub'
import { Profile } from '@/features/profile/types/Profile'
import { MIN_WIDTH } from '@/constants/responsive'
import { stripHtmlTags } from '@/libs/stripHtmlTags'

export type HeroBoxProps = { profile: Profile | null }

export const HeroBox: React.FC<HeroBoxProps> = ({ profile }) => {
  return (
    <div
      className="bg-gray-50/30 py-14 px-24"
      style={{
        // 歪な円形
        borderRadius: '86% 68% 100% 66% / 65% 75% 83% 80%',
        minWidth: MIN_WIDTH,
      }}
    >
      <div className="flex flex-col gap-2 text-center">
        <div
          className="bg-gradient-to-r from-[#09CCAB] to-[#D81BDC] bg-clip-text text-[24px] font-bold text-transparent"
          style={{ clipPath: 'inset(1px)' }}
        >
          <div>{stripHtmlTags(profile?.vision?.title ?? '')}</div>
        </div>
        <div className="text-[64px] leading-[1.1em] sm:text-[72px] md:text-[86px]">
          <div className="flex justify-center">
            {profile?.firstName.toUpperCase()}
          </div>
          <div className="flex justify-center">
            {profile?.lastName.toUpperCase()}
          </div>
        </div>
        <div className="my-2 mx-auto block h-[2px] w-5/12 bg-gray-400"></div>
        <div className="text-2xl font-light tracking-widest">
          {profile?.jobType}
        </div>
        <div className="mx-auto grid w-1/2 grid-cols-2">
          <div>
            <a
              href={`https://twitter.com/${profile?.twitter}/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon fontSize="large" className="text-[#1DA1F2]" />
            </a>
          </div>
          <div>
            <a
              href={`https://github.com/${profile?.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon fontSize="large" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
