import { type NextPage } from 'next'
import { ButtonContained, Input, RoundedContainer } from '../components'
import { useLabels } from '../utils'
import { ThirdPartyLogin } from '../domains/auth'
import Link from 'next/link'

const LoginPage: NextPage = () => {
  const { labels } = useLabels()

  return (
    <RoundedContainer className="m-5 my-20 gap-5 px-12 pb-10 pt-14">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <p className="text-sm">
        {labels.newUser}{' '}
        <Link href="/sign-up" className="cursor-pointer font-bold text-primary">
          {labels.createAccount}
        </Link>
      </p>
      <Input className="mt-3" placeholder="Username" />
      <Input placeholder={labels.password} />
      <Link href="/forgot-password" className="text-end text-sm">
        <u>{labels.forgotPassword}</u>
      </Link>
      <ButtonContained className="py-3 text-white">
        {labels.login}
      </ButtonContained>
      <ThirdPartyLogin />
    </RoundedContainer>
  )
}

export default LoginPage
