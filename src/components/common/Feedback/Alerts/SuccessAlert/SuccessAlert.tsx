import { type FC, useEffect } from 'react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { ButtonOutlined } from '@components'

interface ISuccessAlertProps {
  message: string
  onClose: () => void
}

export const SuccessAlert: FC<ISuccessAlertProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => {
      clearTimeout(timer)
    }
  }, [onClose])

  return (
    <div className="absolute top-4 left-0 right-0 mx-auto h-14 w-1/2 rounded-lg bg-[#D8FBDE] text-sm">
      <div className="flex h-full w-full items-center px-5">
        <CheckCircleIcon className="mr-1 h-6 w-6 fill-primary" />
        <p className="">{message}</p>
        <ButtonOutlined onClick={onClose} className="ml-auto">
          Dismiss
        </ButtonOutlined>
      </div>
    </div>
  )
}
