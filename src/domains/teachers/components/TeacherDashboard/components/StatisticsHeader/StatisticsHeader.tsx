import { type FC } from 'react'

interface IStatisticsHeaderProps {}
interface IStatisticsCardProps {
  title: string
  count: number
}

const StatisticsCard: FC<IStatisticsCardProps> = ({ count, title }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8E9BAF] font-bold text-white">
        {count}
      </div>
      <p className="text-xs">{title}</p>
    </div>
  )
}

export const StatisticsHeader: FC<IStatisticsHeaderProps> = () => {
  return (
    <div className="flex w-fit gap-32 rounded-xl border-2 border-gray-100 px-32 py-4">
      <StatisticsCard count={12} title="Network Schools" />
      <StatisticsCard count={12} title="Favourite Schools" />
      <StatisticsCard count={12} title="Reviews Received" />
    </div>
  )
}
