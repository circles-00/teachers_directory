import { type FC } from 'react'
import { mergeClassNames } from '@utils'

interface LinearProgressBarProps {
  progress: number
  containerClassName?: string
}

export const LinearProgressBar: FC<LinearProgressBarProps> = ({
  progress,
  containerClassName = '',
}) => {
  const defaultContainerClassName = 'h-1 w-full rounded-md bg-[#0000000D]'

  return (
    <div
      className={mergeClassNames([
        defaultContainerClassName,
        containerClassName,
      ])}
    >
      <div
        className={`h-1 rounded-md bg-primary`}
        style={{
          width: `${progress}%`,
        }}
      ></div>
    </div>
  )
}
