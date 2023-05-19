import { ButtonContained, RoundedContainer, TextFormField } from '@components'
import { useLabels } from '@utils'
import { LoginSchema, ThirdPartyLogin, type TLoginForm } from '@domains/auth'
import Link from 'next/link'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SuccessAlert } from 'src/components/common/Feedback/Alerts'
import {
  useSignUpActions,
  useSignUpSuccessMessage,
} from '~/hooks/useStore/helperHooks/useSignUpStore'
import { AuthService } from '@services'
import { type TeachersDirectoryPage } from '~/types/page'

const LoginPage: TeachersDirectoryPage = () => {
  const { labels } = useLabels()

  const signUpSuccessMessage = useSignUpSuccessMessage()
  const { setSignUpSuccessMessage } = useSignUpActions()

  const methods = useForm<TLoginForm>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = async (data: TLoginForm) => {
    await AuthService.signInWithCredentials(data)
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

LoginPage.pageType = 'PUBLIC'
export default LoginPage
