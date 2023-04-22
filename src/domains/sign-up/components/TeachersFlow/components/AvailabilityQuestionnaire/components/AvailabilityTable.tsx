import { type FC } from 'react'
import { TableRow } from '@domains/sign-up/components/TeachersFlow/components/AvailabilityQuestionnaire/components/TableRow'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

interface AvailabilityTableProps {}

export const AvailabilityTable: FC<AvailabilityTableProps> = () => {
  return (
    <div className="mt-7 overflow-x-auto">
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
          <TableRow title="Morning" subtitle="Pre 12 am" />
          <TableRow title="Afternoon" subtitle="1-5 pm" />
          <TableRow title="Evening" subtitle="5pm +" />
        </tbody>
      </table>
    </div>
  )
}
