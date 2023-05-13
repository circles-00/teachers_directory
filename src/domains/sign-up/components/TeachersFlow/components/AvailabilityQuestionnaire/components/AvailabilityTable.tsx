import { type FC, useState } from 'react'
import { TableRow } from '@domains/sign-up/components/TeachersFlow/components/AvailabilityQuestionnaire/components/TableRow'
import { generateArray } from '@utils'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

interface AvailabilityTableProps {}

export const AvailabilityTable: FC<AvailabilityTableProps> = () => {
  const [morning, setMorning] = useState(generateArray(7).map(() => false))
  const [afternoon, setAfternoon] = useState(generateArray(7).map(() => false))
  const [evening, setEvening] = useState(generateArray(7).map(() => false))

  const handleOnSelectAll = () => {
    setMorning(generateArray(7).map(() => true))
    setAfternoon(generateArray(7).map(() => true))
    setEvening(generateArray(7).map(() => true))
  }

  const handleOnUnselectAll = () => {
    setMorning(generateArray(7).map(() => false))
    setAfternoon(generateArray(7).map(() => false))
    setEvening(generateArray(7).map(() => false))
  }

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
            state={morning}
            setState={setMorning}
            title="Morning"
            subtitle="Pre 12 am"
          />
          <TableRow
            state={afternoon}
            setState={setAfternoon}
            title="Afternoon"
            subtitle="1-5 pm"
          />
          <TableRow
            state={evening}
            setState={setEvening}
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
