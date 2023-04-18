import { type FC } from 'react'

interface LinearProgressBarProps {
  progress: number
}

export const LinearProgressBar: FC<LinearProgressBarProps> = ({ progress }) => {
  return (
    <div className="h-1 w-full rounded-md bg-[#0000000D]">
      <div
        className={`h-1 rounded-md bg-primary`}
        style={{
          width: `${progress}%`,
        }}
      ></div>
    </div>
  )
}
