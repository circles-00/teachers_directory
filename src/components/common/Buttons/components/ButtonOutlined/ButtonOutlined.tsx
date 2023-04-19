import { type ReactNode, type MouseEvent, type FC } from 'react'
import { mergeClassNames } from '@utils'

interface IButtonOutlinedProps {
  children: ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  className?: string
}

export const ButtonOutlined: FC<IButtonOutlinedProps> = ({
  children,
  className = '',
  onClick,
}) => {
  const defaultClassName =
    'rounded-md border-[1px] border-primaryTransparent-48 p-2 font-bold children-white'

  return (
    <button
      onClick={onClick}
      className={mergeClassNames([defaultClassName, className])}
    >
      {children}
    </button>
  )
}
