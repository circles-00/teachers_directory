import { type NextPage } from 'next'
import {
  ButtonContained,
  FacebookIcon,
  GoogleIcon,
  Input,
  TwitterIcon,
} from '../components'
import { useLabels } from '../utils'

const Divider = () => <div className="h-[1px] w-3/5 bg-[#919EAB3D]" />

const LoginPage: NextPage = () => {
  const { labels } = useLabels()

  return (
    <div className="m-5 my-20 flex flex-col gap-5 rounded-xl border-2 border-gray-100 px-12 pb-10 pt-14 shadow-sm md:mx-auto md:w-3/12">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <p className="text-sm">
        {labels.newUser}{' '}
        <span className="cursor-pointer font-bold text-primary">
          {labels.createAccount}
        </span>
      </p>
      <Input className="mt-3" placeholder="Username" />
      <Input placeholder="Password" />
      <p className="text-end text-sm">
        <u>{labels.forgotPassword}</u>
      </p>
      <ButtonContained className="text-white">{labels.login}</ButtonContained>
      <div className="flex items-center">
        <Divider />
        <p className="mx-3 text-xs">{labels.or}</p>
        <Divider />
      </div>
      <div className="flex items-center justify-center gap-4">
        <GoogleIcon />
        <FacebookIcon />
        <div className="ml-[-10px]">
          <TwitterIcon />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
