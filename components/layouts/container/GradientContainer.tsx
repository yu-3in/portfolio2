import classNames from 'classnames'
import { CSSProperties } from 'react'

export type GradientContainerProps = {
  children: React.ReactNode
  fromColor?: string
  viaColor?: string
  toColor?: string
  direction?:
    | 'to-t'
    | 'to-b'
    | 'to-l'
    | 'to-r'
    | 'to-tl'
    | 'to-tr'
    | 'to-bl'
    | 'to-br'
  className?: string
}

export const GradientContainer: React.FC<GradientContainerProps> = ({
  children,
  fromColor,
  viaColor,
  toColor,
  direction = 'to-b',
  className,
}) => {
  const bgDirection =
    direction === 'to-t'
      ? 'bg-gradient-to-t'
      : direction === 'to-b'
      ? 'bg-gradient-to-b'
      : direction === 'to-l'
      ? 'bg-gradient-to-l'
      : direction === 'to-r'
      ? 'bg-gradient-to-r'
      : direction === 'to-tl'
      ? 'bg-gradient-to-tl'
      : direction === 'to-tr'
      ? 'bg-gradient-to-tr'
      : direction === 'to-bl'
      ? 'bg-gradient-to-bl'
      : direction === 'to-br'
      ? 'bg-gradient-to-br'
      : ''

  return (
    <div
      style={
        {
          '--tw-gradient-from': fromColor,
          '--tw-gradient-via': viaColor,
          '--tw-gradient-to': toColor,
          '--tw-gradient-stops':
            fromColor && toColor && `${fromColor}, ${toColor}`,
        } as CSSProperties
      }
      className={classNames(className, `${bgDirection}`)}
    >
      {children}
    </div>
  )
}
