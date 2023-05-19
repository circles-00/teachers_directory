import { type FC, useEffect, useState } from 'react'
import { mergeClassNames } from '@utils'

interface IDissapearingMessageProps {
  message: string
  type: 'success' | 'error'
  className?: string
  duration?: number
}

export const DissapearingMessage: FC<IDissapearingMessageProps> = ({
  message,
  type,
  className = '',
  duration,
}) => {
  const [isMessageVisible, setIsMessageVisible] = useState(true)

  const defaultClassName = `text-sm ${
    type === 'success' ? 'text-primary' : 'text-danger'
  }`

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMessageVisible(false)
    }, duration ?? 3000)

    return () => {
      clearTimeout(timeout)
    }
  }, [duration])

  if (!isMessageVisible) return null

  return (
    <p className={mergeClassNames([defaultClassName, className])}>{message}</p>
  )
}
