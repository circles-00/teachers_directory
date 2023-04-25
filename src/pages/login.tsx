import { type NextPage } from 'next'
import {
  ButtonContained,
  RoundedContainer,
  SuccessAlert,
  TextFormField,
} from '@components'
import { useLabels } from '@utils'
import {
  LoginSchema,
  ThirdPartyLogin,
  type TLoginForm,
  useAuthStore,
} from '@domains/auth'
import Link from 'next/link'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'

const LoginPage: NextPage = () => {
  const { labels } = useLabels()

  const { signUpSuccessMessage, setSignUpSuccessMessage } = useAuthStore()

  const methods = useForm<TLoginForm>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = async (data: TLoginForm) => {
    await signIn('credentials', {
      ...data,
      redirect: false,
    })
  }

  const closeSignUpSuccessMessage = () => {
    setSignUpSuccessMessage('')
  }

  return (
    <FormProvider {...methods}>
      {!!signUpSuccessMessage && (
        <SuccessAlert
          message={signUpSuccessMessage}
          onClose={closeSignUpSuccessMessage}
        />
      )}
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <RoundedContainer className="m-5 my-20 gap-5 px-12 pb-10 pt-14">
          <h1 className="text-3xl font-bold">Sign in</h1>
          <p className="text-sm">
            {labels.newUser}{' '}
            <Link
              href="/sign-up"
              className="cursor-pointer font-bold text-primary"
            >
              {labels.createAccount}
            </Link>
          </p>
          <TextFormField
            name="username"
            className="mt-3"
            placeholder="Username"
          />
          <TextFormField
            name="password"
            type="password"
            placeholder={labels.password}
          />
          <Link href="/forgot-password" className="text-end text-sm">
            <u>{labels.forgotPassword}</u>
          </Link>
          <ButtonContained className="py-3 text-white">
            {labels.login}
          </ButtonContained>
          <ThirdPartyLogin />
        </RoundedContainer>
      </form>
    </FormProvider>
  )
}

export default LoginPage
