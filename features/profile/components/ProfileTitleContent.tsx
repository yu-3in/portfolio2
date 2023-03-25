import classNames from 'classnames'

export type ProfileTitleContentProps = {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export const ProfileTitleContent: React.FC<ProfileTitleContentProps> = ({
  title,
  icon,
  children,
  className,
}) => {
  return (
    <div>
      <div className="mb-4 flex gap-2">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>

      <div className={classNames('ml-2', className)}>{children}</div>
    </div>
  )
}
