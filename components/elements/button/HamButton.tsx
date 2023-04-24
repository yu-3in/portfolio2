import classNames from 'classnames'

export type HamButtonProps = {
  isOpen: boolean
  onClick: () => void
  className?: string
}

export const HamButton: React.FC<HamButtonProps> = ({
  isOpen,
  onClick,
  className,
}) => {
  return (
    <button
      className={classNames('relative block h-[36px] w-[42px]', className)}
      onClick={onClick}
    >
      <div
        className={classNames('absolute h-[2px] bg-gray-400', {
          'top-[10px] left-[4px] w-[15px] -translate-x-[5px] rotate-[135deg]':
            isOpen,
          'top-1 w-[100%]': !isOpen,
        })}
        style={{
          transition: 'transform 0.4s ease, -webkit-transform 0.4s ease',
        }}
      ></div>
      <div
        className={classNames('absolute h-[2px] w-[80%] bg-gray-400', {
          'top-[16px] rotate-[180deg]': isOpen,
          'top-4': !isOpen,
        })}
        style={{
          transition: 'transform 0.8s ease, -webkit-transform 0.8s ease',
        }}
      ></div>
      <div
        className={classNames('absolute h-[2px] bg-gray-400', {
          'bottom-[12px] left-[4px] w-[15px] -translate-x-[5px] -rotate-[135deg]':
            isOpen,
          'top-7 w-[60%]': !isOpen,
        })}
        style={{
          transition: 'transform 1.2s ease, -webkit-transform 1.2s ease',
        }}
      ></div>
    </button>
  )
}
