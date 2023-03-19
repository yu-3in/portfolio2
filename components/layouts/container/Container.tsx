export type ContainerProps = {
  children: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="relative mx-auto w-11/12 px-4 py-2 md:w-10/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12">
      {children}
    </div>
  )
}
