import { type FC, useMemo } from 'react'
import { EmailInboxIcon } from '@components'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { CodeConfirmationForm } from '@domains/auth'
import { PasswordConfirmation } from './PasswordConfirmation'
import { api } from '@utils'
import { DissapearingMessage } from '@components/common/Feedback'

interface ICodeConfirmationProps {
  isForgotPassword?: boolean
  onSubmit: (code: string) => void
  isCodeCorrect?: boolean
  error?: string
  email?: string
}

export const CodeConfirmation: FC<ICodeConfirmationProps> = ({
  isForgotPassword,
  onSubmit,
  isCodeCorrect,
  error,
  email,
}) => {
  const {
    mutate,
    isSuccess,
    isError,
    error: verificationErrors,
  } = api.auth.resendVerificationEmail.useMutation()

  const messageType = useMemo(() => {
    if (isSuccess) return 'success'

    return 'error'
  }, [isSuccess])

  const message = useMemo(() => {
    if (isSuccess) return 'Verification email has been sent!'

    return verificationErrors?.message ?? 'Something went wrong!'
  }, [verificationErrors, isSuccess])

  return (
    <div className="my-20 flex flex-col">
      <div className="flex w-full flex-col items-center gap-4 px-4 md:mx-auto md:w-2/6">
        <EmailInboxIcon />
        <h1 className="mt-4 text-center text-3xl font-bold">
          Please check your email!
        </h1>
        <p className="text-center">
          We&apos;ve emailed a 6-digit confirmation code to <br /> {email},
          please enter the code in below box to <br /> verify your email.
        </p>
        <CodeConfirmationForm
          isCodeCorrect={isCodeCorrect}
          onSubmit={onSubmit}
        />
        {isForgotPassword && isCodeCorrect && <PasswordConfirmation />}
        {!!error && <p className="text-sm text-danger">{error}</p>}
        {!isCodeCorrect && (
          <>
            <p className="text-sm">
              Don&apos;t have a code?{' '}
              <span
                onClick={() => mutate({ email: email ?? '' })}
                className="cursor-pointer font-bold text-primary"
              >
                Resend code
              </span>
            </p>
            {(isError || isSuccess) && (
              <DissapearingMessage message={message} type={messageType} />
            )}
          </>
        )}
        {isForgotPassword && (
          <div className="flex items-center gap-2">
            <ChevronLeftIcon className="h-4 w-4" />
            <Link href="/src/pages/login" className="text-sm text-black">
              Return to sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
