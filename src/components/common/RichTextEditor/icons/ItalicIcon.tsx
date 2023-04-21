import { type FC } from 'react'
import { type EditorIconProps } from '../types'

interface IItalicIconProps extends EditorIconProps {}

export const ItalicIcon: FC<IItalicIconProps> = ({ fillColor }) => {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 9 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 1.07143C3 1.66429 3.5025 2.14286 4.125 2.14286H4.6575L2.0925 7.85714H1.125C0.5025 7.85714 0 8.33571 0 8.92857C0 9.52143 0.5025 10 1.125 10H4.875C5.4975 10 6 9.52143 6 8.92857C6 8.33571 5.4975 7.85714 4.875 7.85714H4.3425L6.9075 2.14286H7.875C8.4975 2.14286 9 1.66429 9 1.07143C9 0.478571 8.4975 0 7.875 0H4.125C3.5025 0 3 0.478571 3 1.07143Z"
        className={fillColor ?? 'fill-colorText'}
      />
    </svg>
  )
}
