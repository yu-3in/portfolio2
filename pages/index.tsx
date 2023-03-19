import { Inter } from 'next/font/google'
import { Hero } from '@/features/hero/components'
import { Container } from '@/components/layouts/container/Container'
import { GradientContainer } from '@/components/layouts/container/GradientContainer'
import { SectionHeading } from '@/components/elements/heading'
import { WorkList } from '@/features/work/components'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div
        className="bg-image-[url( absolute top-0 h-screen w-full"
        style={{
          backgroundImage: 'url(/hero.jpg)',
        }}
      ></div>
      <Hero />
      <GradientContainer
        fromColor="rgba(190, 255, 250, 0.51)"
        toColor="rgba(172, 240, 244, 0.91)"
        direction="to-b"
        className="relative"
      >
        <Container className="pt-16">
          <SectionHeading>Works</SectionHeading>
          <WorkList />
        </Container>
      </GradientContainer>
    </>
  )
}
