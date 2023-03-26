import classNames from 'classnames'

export type WorkTitleContentProps = {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export const WorkTitleContent: React.FC<WorkTitleContentProps> = ({
  title,
  icon,
  children,
  className,
}) => {
  return (
    <dl>
      <dt className="mb-4 flex gap-2">
        {icon}
        <h2 className="text-2xl font-bold">{title}</h2>
      </dt>
      <dd className={classNames('ml-2', className)}>{children}</dd>
    </dl>
  )
}
