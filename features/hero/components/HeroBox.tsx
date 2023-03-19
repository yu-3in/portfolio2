import TwitterIcon from '@mui/icons-material/Twitter'
import GitHubIcon from '@mui/icons-material/GitHub'

export type HeroBoxProps = {}

export const HeroBox: React.FC<HeroBoxProps> = () => {
  return (
    <div className="rounded-3xl bg-gray-50/30 py-8 px-20">
      <div className="flex flex-col gap-2 text-center">
        <div className="bg-gradient-to-r from-[#09CCAB] to-[#D81BDC] bg-clip-text text-[24px] font-bold text-transparent">
          <div>
            <div className="lg:inline">世界を笑顔にする</div>
            <div className="lg:inline">サービスを。</div>
          </div>
        </div>
        <div className="text-[86px] leading-[1.1em]">
          <div>KOKI</div>
          <div>YUMOTO</div>
        </div>
        <div className="my-2 mx-auto block h-[2px] w-5/12 bg-gray-400"></div>
        <div className="text-2xl font-light tracking-widest">Web Engineer</div>
        <div className="mx-auto grid w-1/2 grid-cols-2">
          <div>
            <a href="">
              <TwitterIcon fontSize="large" />
            </a>
          </div>
          <div>
            <a href="">
              <GitHubIcon fontSize="large" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
