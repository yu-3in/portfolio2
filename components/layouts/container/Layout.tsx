export type LayoutProps = { children: React.ReactNode }

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className="p-2 px-4">{children}</div>
}
