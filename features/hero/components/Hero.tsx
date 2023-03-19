import { GradientContainer } from '@/components/layouts/container/GradientContainer'
import { Box, Card, CardContent } from '@mui/material'
import { HeroBox } from './HeroBox'

export type HeroProps = {}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <GradientContainer
      fromColor="#A2F4E6"
      toColor="rgba(205, 84, 235, 0.3)"
      direction="to-r"
      className="relative h-screen"
    >
      <div className="bg- absolute top-1/2 left-1/2 max-w-[92%] -translate-x-1/2 -translate-y-1/2 transform">
        <HeroBox />
      </div>
    </GradientContainer>
  )
}
