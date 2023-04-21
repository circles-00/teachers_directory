import { type FC } from 'react'
import { type EditorIconProps } from '../types'

interface IBoldIconProps extends EditorIconProps {}

export const BoldIcon: FC<IBoldIconProps> = ({ fillColor }) => {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 8 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.3999 4.85C7.12175 4.37143 7.62779 3.58571 7.62779 2.85714C7.62779 1.24286 6.32548 0 4.65109 0H0.744174C0.334878 0 0 0.321429 0 0.714286V9.28571C0 9.67857 0.334878 10 0.744174 10H5.0455C6.58594 10 7.99243 8.79286 7.99987 7.30714C8.00731 6.21429 7.36732 5.27857 6.3999 4.85ZM2.23252 1.78571H4.46504C5.08271 1.78571 5.58131 2.26429 5.58131 2.85714C5.58131 3.45 5.08271 3.92857 4.46504 3.92857H2.23252V1.78571ZM2.23252 8.21429H4.83713C5.4548 8.21429 5.95339 7.73571 5.95339 7.14286C5.95339 6.55 5.4548 6.07143 4.83713 6.07143H2.23252V8.21429Z"
        className={fillColor ?? 'fill-colorText'}
      />
    </svg>
  )
}
