import { ButtonContained, RoundedContainer, TextFormField } from '@components'
import { formResolver, useLabels } from '@utils'
import { LoginSchema, ThirdPartyLogin, type TLoginForm } from '@domains/auth'
import Link from 'next/link'
import { FormProvider, useForm } from 'react-hook-form'
import { AuthService } from '@services'
import { type TeachersDirectoryPage } from '~/types/page'
import { useRouter } from 'next/router'

const LoginPage: TeachersDirectoryPage = () => {
  const { labels } = useLabels()

  const router = useRouter()

  const methods = useForm<TLoginForm>({
    resolver: formResolver(LoginSchema),
  })

  const onSubmit = (data: TLoginForm) => {
    AuthService.signInWithCredentials(data)
      .then(() => {
        // TODO: Route based on role
        router.push('/teachers/dashboard').catch(console.error)
      })
      .catch(console.error)
  }

  return (
    <FormProvider {...methods}>
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
