import { type ReactNode, type MouseEvent, type FC } from 'react'
import { mergeClassNames } from '@utils'

interface IButtonOutlinedProps {
  children: ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export const ButtonOutlined: FC<IButtonOutlinedProps> = ({
  children,
  className = '',
  onClick,
  disabled,
  type,
}) => {
  const defaultClassName = `rounded-md border-[1px] border-primaryTransparent-48 p-2 font-bold children-white ${
    disabled
      ? 'bg-[#919EAB3D] text-[#919EABCC] cursor-not-allowed'
      : 'text-primary button-white cursor-pointer'
  }`

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={mergeClassNames([defaultClassName, className])}
    >
      {children}
    </button>
  )
}
