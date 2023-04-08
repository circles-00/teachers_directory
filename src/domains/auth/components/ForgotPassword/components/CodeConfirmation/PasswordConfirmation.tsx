import { type FC } from 'react'
import { ButtonContained, Input } from '@components'

interface IPasswordConfirmationProps {}

export const PasswordConfirmation: FC<IPasswordConfirmationProps> = () => {
  return (
    <div className="flex w-full flex-col gap-4 md:w-[67.5%]">
      <Input placeholder="Password" />
      <Input placeholder="Confirm Password" />
      <ButtonContained className="p-3 text-white">
        Update Password
      </ButtonContained>
    </div>
  )
}
