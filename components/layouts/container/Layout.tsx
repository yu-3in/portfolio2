import classNames from 'classnames'
import { Header } from '../header'

export type LayoutProps = { children: React.ReactNode; className?: string }

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={classNames(className, `relative min-h-screen`)}>
      <Header />
      <main>{children}</main>
    </div>
  )
}
