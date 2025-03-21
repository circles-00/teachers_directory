import { type FC } from 'react'
import { ButtonWithLoading, RoundedContainer, TextFormField } from '@components'
import Link from 'next/link'
import { ThirdPartyLogin } from '@domains/auth'
import { useLabels } from '@utils'
import { DissapearingMessage } from '@components/common/Feedback'

interface ISignUpFormProps {
  isLoading: boolean
  error?: string
}

export const SignUpForm: FC<ISignUpFormProps> = ({ isLoading, error }) => {
  const { labels } = useLabels()

  return (
    <div className="md:w-5/6">
      <RoundedContainer className="m-5 mx-auto mt-10 w-full gap-5 px-8 py-12 md:w-6/12">
        <h1 className="text-center text-xl font-bold text-black">
          Join the Teachers&apos; Directory Community
        </h1>
        <div className="flex flex-col gap-6 md:flex-row md:justify-between md:gap-2">
          <TextFormField name="firstName" placeholder={labels.firstName} />
          <TextFormField name="lastName" placeholder={labels.surname} />
        </div>
        <TextFormField name="email" placeholder={labels.email} />
        <TextFormField
          name="password"
          type="password"
          placeholder={labels.password}
        />
        {!!error && (
          <DissapearingMessage
            className="my-[-10px]"
            message={error}
            type={'error'}
          />
        )}
        <ButtonWithLoading isLoading={isLoading}>
          Create account
        </ButtonWithLoading>
        <p className="text-center text-xs">
          By signing up, I agree to{' '}
          <Link className="text-primary" href="#">
            <u>Terms of Use</u>
          </Link>{' '}
          and
          <Link className="text-primary" href="#">
            <u> Privacy Policy</u>
          </Link>
          .
        </p>
        <ThirdPartyLogin />
      </RoundedContainer>
      <p className="text-center text-sm">
        Already have an account?{' '}
        <Link href="/login" className="font-bold text-primary">
          Sign in
        </Link>
      </p>
    </div>
  )
}
