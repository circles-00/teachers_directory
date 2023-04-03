import { type NextPage } from 'next'
import { ForgotPasswordIcon } from '@components/svgs'
import { ButtonContained, Input } from '../components'
import { useLabels } from '../utils'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const ForgotPassword: NextPage = () => {
  const { labels } = useLabels()
  return (
    <div className="my-20 flex flex-col">
      <div className="mx-auto flex w-full flex-col items-center gap-4 md:w-2/6">
        <ForgotPasswordIcon />
        <h1 className="mt-4 text-center text-3xl font-bold">
          Forgot your Password?
        </h1>
        <p className="text-center">
          Please enter the email address associated with your <br /> account,
          and we&apos;ll email you a link to reset your <br /> password.
        </p>
        <Input className="mx-auto w-4/5 md:w-4/6" placeholder={labels.email} />
        <ButtonContained className="mx-auto w-4/5 py-3 text-white md:w-4/6">
          Reset Password
        </ButtonContained>
        <div className="flex items-center gap-2">
          <ChevronLeftIcon className="h-4 w-4" />
          <Link href="/login" className="text-sm text-black">
            Return to sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
