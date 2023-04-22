import { type NextPage } from 'next'
import { Logo } from '@components/svgs'
import { ButtonContained, Input, RoundedContainer } from '../../components'
import { useLabels } from '@utils'
import { ThirdPartyLogin } from '../../domains/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'

const SignUp: NextPage = () => {
  const { labels } = useLabels()
  const router = useRouter()

  const handleOnCreateAccount = () => {
    router.push('/sign-up/account-type').catch((err) => console.error(err))
  }

  return (
    <div className="md:ml-52">
      <div className="my-12 flex flex-col md:ml-10 md:flex-row">
        <div className="flex flex-col gap-4 md:mt-32">
          <h1 className="text-5xl font-bold">
            Get started <br /> absolutely <br />{' '}
            <span className="bg-gradient-to-r from-[#FFAB00] via-[#00AB55] to-[#00AB55] bg-clip-text text-transparent">
              for free
            </span>
          </h1>
          <p className="text-2xl text-primary">
            Whether you are <b>a teacher</b> <br /> or a{' '}
            <b>school representative</b>, get the best <br /> out of Teachers
            Directory
          </p>
        </div>
        <div className="md:w-3/5">
          <RoundedContainer className="m-5 mx-auto mt-10 w-full gap-5 px-8 py-12 md:w-6/12">
            <h1 className="text-center text-xl font-bold text-black">
              Join the Teachers&apos; Directory Community
            </h1>
            <div className="flex flex-col gap-6 md:flex-row md:justify-between md:gap-2">
              <Input placeholder={labels.firstName} />
              <Input placeholder={labels.surname} />
            </div>
            <Input placeholder={labels.email} />
            <Input placeholder={labels.password} />
            <ButtonContained
              onClick={handleOnCreateAccount}
              className="py-4 text-white"
            >
              Create account
            </ButtonContained>
            <p className="text-center text-xs">
              By signing up, I agree to{' '}
              <Link href="#">
                <u>Terms of Use</u>
              </Link>{' '}
              and
              <Link href="#">
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
      </div>
    </div>
  )
}

export default SignUp
