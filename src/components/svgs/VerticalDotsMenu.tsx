import { type FC } from 'react'

interface IVerticalDotsMenuProps {}

export const VerticalDotsMenu: FC<IVerticalDotsMenuProps> = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 20C22 21.1046 21.1046 22 20 22C18.8954 22 18 21.1046 18 20C18 18.8954 18.8954 18 20 18C21.1046 18 22 18.8954 22 20Z"
        fill="#637381"
      />
      <path
        d="M22 13C22 14.1046 21.1046 15 20 15C18.8954 15 18 14.1046 18 13C18 11.8954 18.8954 11 20 11C21.1046 11 22 11.8954 22 13Z"
        fill="#637381"
      />
      <path
        d="M22 27C22 28.1046 21.1046 29 20 29C18.8954 29 18 28.1046 18 27C18 25.8954 18.8954 25 20 25C21.1046 25 22 25.8954 22 27Z"
        fill="#637381"
      />
    </svg>
  )
}
