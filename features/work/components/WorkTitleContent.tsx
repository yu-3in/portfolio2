import classNames from 'classnames'

export type WorkTitleContentProps = {
  title: string
  titleSize?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export const WorkTitleContent: React.FC<WorkTitleContentProps> = ({
  title,
  titleSize = 'md',
  icon,
  children,
  className,
}) => {
  return (
    <dl>
      <dt
        className={classNames('flex gap-2', {
          'mb-2': titleSize === 'sm',
          'mb-4': titleSize === 'md',
          'mb-6': titleSize === 'lg',
        })}
      >
        {icon}
        <h2
          className={classNames('font-bold', {
            'text-lg': titleSize === 'sm',
            'text-2xl': titleSize === 'md',
            'text-3xl': titleSize === 'lg',
          })}
        >
          {title}
        </h2>
      </dt>
      <dd className={classNames('ml-2', className)}>{children}</dd>
    </dl>
  )
}
