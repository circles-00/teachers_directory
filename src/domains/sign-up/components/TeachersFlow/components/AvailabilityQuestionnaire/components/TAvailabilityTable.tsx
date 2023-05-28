import { type FC, useState } from 'react'
import { TableRow } from '@domains/sign-up/components/TeachersFlow/components/AvailabilityQuestionnaire/components/TableRow'
import { generateArray } from '@utils'
import { useUpdate } from '@rounik/react-custom-hooks'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export type TAvailabilityTable = {
  morning: boolean[]
  afternoon: boolean[]
  evening: boolean[]
}

interface AvailabilityTableProps {
  onChange?: (value: TAvailabilityTable) => void
  initialValue?: TAvailabilityTable
}

export const AvailabilityTable: FC<AvailabilityTableProps> = ({
  onChange,
  initialValue,
}) => {
  const [availabilityTable, setAvailabilityTable] =
    useState<TAvailabilityTable>({
      morning: generateArray(7).map(() => false),
      afternoon: generateArray(7).map(() => false),
      evening: generateArray(7).map(() => false),
    })
  const handleOnSelectAll = () => {
    setAvailabilityTable({
      morning: generateArray(7).map(() => true),
      afternoon: generateArray(7).map(() => true),
      evening: generateArray(7).map(() => true),
    })
  }

  const handleOnUnselectAll = () => {
    setAvailabilityTable({
      morning: generateArray(7).map(() => false),
      afternoon: generateArray(7).map(() => false),
      evening: generateArray(7).map(() => false),
    })
  }

  useUpdate(
    () => {
      onChange && onChange(availabilityTable)
    },
    [availabilityTable],
    true // deep compare, important for arrays
  )

  useUpdate(() => {
    if (initialValue) {
      setAvailabilityTable(initialValue)
    }
  }, [initialValue])

  return (
    <div className="mt-7 flex flex-col overflow-x-auto">
      {/* DaisyUI */}
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th className="bg-[#00AB550D]"></th>
            {days.map((day, index) => (
              <th
                className="bg-[#00AB550D] text-sm font-medium normal-case text-[#637381]"
                key={index}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <TableRow
            state={availabilityTable.morning}
            setState={(value) =>
              setAvailabilityTable({ ...availabilityTable, morning: value })
            }
            title="Morning"
            subtitle="Pre 12 am"
          />
          <TableRow
            state={availabilityTable.afternoon}
            setState={(value) =>
              setAvailabilityTable({ ...availabilityTable, afternoon: value })
            }
            title="Afternoon"
            subtitle="1-5 pm"
          />
          <TableRow
            state={availabilityTable.evening}
            setState={(value) =>
              setAvailabilityTable({ ...availabilityTable, evening: value })
            }
            title="Evening"
            subtitle="5pm +"
          />
        </tbody>
      </table>
      <div className="ml-auto mr-8 flex gap-2">
        <button onClick={handleOnSelectAll} className="text-primary">
          Select all
        </button>
        <p>/</p>
        <button onClick={handleOnUnselectAll} className="text-primary">
          Unselect all
        </button>
      </div>
    </div>
  )
}
