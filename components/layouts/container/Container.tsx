import { MIN_WIDTH } from '@/constants/responsive'
import classNames from 'classnames'

export type ContainerProps = {
  children: React.ReactNode
  className?: string
  size?: 'medium' | 'large'
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'medium',
}) => {
  return (
    <div
      className={classNames(className, 'relative mx-auto', {
        'w-11/12 px-4 py-2 md:w-10/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12':
          size === 'medium',
        'w-11/12 px-4 py-2 md:w-10/12 lg:w-10/12 xl:w-9/12 2xl:w-9/12':
          size === 'large',
      })}
      style={{ minWidth: MIN_WIDTH }}
    >
      {children}
    </div>
  )
}
