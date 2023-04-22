import { type FC } from 'react'
import { Input } from '@components'

interface IAccountDetailsFormProps {
  termsAccepted: boolean
  setTermsAccepted: (value: boolean) => void
}

export const AccountDetailsForm: FC<IAccountDetailsFormProps> = ({
  termsAccepted,
  setTermsAccepted,
}) => {
  return (
    <div className="mt-8 flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <Input placeholder={'First name'} />
        <Input placeholder={'Surname'} />
      </div>
      <div className="">
        <Input placeholder={'Job title'} />
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full">
          <Input placeholder={'Email Address'} />
          <p className="mt-2 text-sm">
            Must be a valid school/organisational email address.
          </p>
        </div>
        <div className="w-full">
          <Input placeholder={'Password'} />
          <p className="mt-2 text-sm">
            Must be 8 characters long and must contain at least 1 uppercase
            letter and 1 digit character.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <input
          className="h-4 w-4 accent-primary"
          type="checkbox"
          onChange={() => setTermsAccepted(!termsAccepted)}
        />
        <p>
          I have read and accept the{' '}
          <span className="text-primary">terms and conditions.</span>
        </p>
      </div>
    </div>
  )
}
