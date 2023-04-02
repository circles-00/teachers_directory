import { type NextPage } from 'next'
import { ButtonContained, Input, RoundedContainer } from '../components'
import { useLabels } from '../utils'
import { ThirdPartyLogin } from '../domains/auth'

const LoginPage: NextPage = () => {
  const { labels } = useLabels()

  return (
    <RoundedContainer className="m-5 my-20 gap-5 px-12 pb-10 pt-14">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <p className="text-sm">
        {labels.newUser}{' '}
        <span className="cursor-pointer font-bold text-primary">
          {labels.createAccount}
        </span>
      </p>
      <Input className="mt-3" placeholder="Username" />
      <Input placeholder={labels.password} />
      <p className="text-end text-sm">
        <u>{labels.forgotPassword}</u>
      </p>
      <ButtonContained className="text-white">{labels.login}</ButtonContained>
      <ThirdPartyLogin />
    </RoundedContainer>
  )
}

export default LoginPage
