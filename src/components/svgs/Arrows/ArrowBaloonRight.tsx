import { type FC } from 'react'

interface IArrowBaloonRightProps {}

export const ArrowBaloonRight: FC<IArrowBaloonRightProps> = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 14.7385H12.7821V19L20 11.9433L12.7821 5V9.23979H4V14.7385Z"
        fill="white"
      />
    </svg>
  )
}
