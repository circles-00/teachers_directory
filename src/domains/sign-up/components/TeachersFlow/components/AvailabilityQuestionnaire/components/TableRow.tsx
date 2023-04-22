import { type FC } from 'react'
import { generateArray } from '@utils'

interface TableRowProps {
  title: string
  subtitle: string
}
export const TableRow: FC<TableRowProps> = ({ title, subtitle }) => {
  return (
    <tr>
      <th>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">{title}</p>
          <p className="font-semibold text-[#919EAB]">{subtitle}</p>
        </div>
      </th>
      {generateArray(7).map((_, index) => (
        <td key={index}>
          <input className="ml-1 h-5 w-5 accent-primary" type="checkbox" />
        </td>
      ))}
    </tr>
  )
}
