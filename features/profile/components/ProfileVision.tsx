import { ParsedHTML } from '@/components/elements/content/parseHTML'
import { Container } from '@/components/layouts/container/Container'
import { Vision } from '../types/Vision'

export type ProfileVisionProps = { vision?: Vision }

export const ProfileVision: React.FC<ProfileVisionProps> = ({ vision }) => {
  return (
    <div className="relative">
      <div
        className="absolute top-[20%] right-[5%] h-[67%] w-[80%] max-w-[880px] bg-white/80 sm:h-[65%] sm:w-[67%] md:right-1/2 md:left-1/2 md:h-[80%] md:w-[77%] md:-translate-x-1/2 lg:h-full"
        style={{
          borderRadius: '74% 26% 32% 68% / 63% 53% 47% 37% ',
        }}
      ></div>
      <div className="relative overflow-hidden 2xl:right-40">
        <h2
          className="text-right text-5xl font-medium tracking-[.5em] opacity-30 sm:text-6xl  md:text-[7rem]"
          style={{
            color: 'rgba(78, 178, 191, 1)',
            // color: 'rgba(78, 168, 191, 1)',
            // color: 'rgba(78, 168, 171, 1)',
            // emboss
            textShadow:
              '3px 3px 0 rgba(255, 255, 255, 0.3), -2px -2px 0 rgba(0, 0, 0, 0.6)',
          }}
        >
          VISION
        </h2>
      </div>
      <div className="relative mx-auto w-11/12 sm:w-10/12 md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12">
        <h3
          className="bg-clip-text p-4 text-4xl font-semibold text-transparent sm:text-5xl md:text-[5.3em]"
          style={{
            background:
              'linear-gradient(to right, rgba(10, 163, 137, 0.86), rgba(216, 27, 220, 0.53))',
            // 'linear-gradient(to right, rgba(1, 81, 67, 0.86), rgba(27,  128, 220, 0.53))',
          }}
        >
          <ParsedHTML html={vision?.title} />
        </h3>
      </div>
      <Container>
        <div
          className="mt-8 bg-clip-text"
          style={{
            color: 'rgba(0, 93, 122, 1)',
          }}
        >
          <ParsedHTML html={vision?.description} />
        </div>
      </Container>
    </div>
  )
}
