import classNames from 'classnames'

export type LayoutProps = { children: React.ReactNode; className?: string }

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={classNames(className, `relative min-h-screen`)}>
      <main>{children}</main>
    </div>
  )
}
