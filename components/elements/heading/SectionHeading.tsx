export type SectionHeadingProps = {
  id?: string
  children?: React.ReactNode
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  id,
  children,
}) => {
  return (
    <h2
      className="mb-12 text-center text-6xl after:mx-auto after:block after:h-[5px] after:w-3/12 after:bg-black"
      id={id}
    >
      {children}
    </h2>
  )
}
