import { fadeInOption, fadeInClassName } from '@/constants/animation'
import classNames from 'classnames'
import { useInView } from 'react-intersection-observer'

export type SlideInProps = { children: React.ReactNode }

export const SlideIn: React.FC<SlideInProps> = ({ children }) => {
  const { ref, inView } = useInView(fadeInOption)

  return (
    <div
      ref={ref}
      className={classNames({
        ...fadeInClassName(inView),
      })}
    >
      {children}
    </div>
  )
}
