import { type FC } from 'react'
import { generateArray } from '@utils'

interface TableRowProps {
  title: string
  subtitle: string
  state: boolean[]
  setState: (state: boolean[]) => void
}
export const TableRow: FC<TableRowProps> = ({
  title,
  subtitle,
  state,
  setState,
}) => {
  const isCheck = (index: number) => state[index]

  const handleOnChange = (index: number) => {
    const newState = state.map((item, i) => {
      if (index === i) {
        return !item
      }
      return item
    })
    setState(newState)
  }

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
          <input
            onChange={() => handleOnChange(index)}
            checked={isCheck(index)}
            className="ml-1 h-5 w-5 accent-primary"
            type="checkbox"
          />
        </td>
      ))}
    </tr>
  )
}
