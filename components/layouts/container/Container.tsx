import { MIN_WIDTH } from '@/constants/responsive'
import classNames from 'classnames'

export type ContainerProps = {
  children: React.ReactNode
  className?: string
  size?: 'medium' | 'large'
  align?: 'center' | 'left' | 'right'
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'medium',
  align = 'center',
}) => {
  return (
    <div
      className={classNames(className, 'relative mx-auto px-0 py-2', {
        'w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12':
          align === 'center' && size === 'medium',
        'w-11/12 md:w-10/12 lg:w-10/12 xl:w-9/12 2xl:w-9/12':
          align === 'center' && size === 'large',
        'ml-0': align === 'left',
        'mr-0': align === 'right',
        'w-[95.83%] md:w-[91.66%] lg:w-[83.33%] xl:w-[79.16%] 2xl:w-[75%]':
          align !== 'center' && size === 'medium',
        'w-[95.83%] md:w-[91.66%] lg:w-[91.66%] xl:w-[87.5%] 2xl:w-[87.5%]':
          align !== 'center' && size === 'large',
      })}
      style={{ minWidth: MIN_WIDTH }}
    >
      {children}
    </div>
  )
}
