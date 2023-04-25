import { type NextPage } from 'next'
import { api } from '@utils'
import {
  CodeConfirmation,
  SignUpForm,
  SignUpSchema,
  type TSignUp,
  useAuthStore,
} from '@domains/auth'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

const SignUp: NextPage = () => {
  const router = useRouter()
  const { setSignUpSuccessMessage } = useAuthStore()
  const [userEmail, setUserEmail] = useState('')

  const { mutate, isSuccess, isLoading } = api.auth.signUp.useMutation({
    onSuccess: ({ user }) => {
      setUserEmail(user.email)
    },
  })
  const { mutate: confirmCode, error } = api.auth.verifyAccount.useMutation({
    onSuccess: () => {
      setSignUpSuccessMessage(
        'Account created successfully. You may now login!'
      )
      router.push('/login').catch((err) => console.error(err))
    },
  })

  const methods = useForm<TSignUp>({ resolver: zodResolver(SignUpSchema) })

  const onSubmit = (data: TSignUp) => {
    mutate(data)
  }

  const onCodeConfirmation = useCallback(
    (code: string) => {
      confirmCode({ code: parseInt(code), email: userEmail })
    },
    [confirmCode, userEmail]
  )

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="md:ml-52">
          <div className="my-12 flex flex-col md:ml-10 md:flex-row">
            <div className="mx-10 flex flex-col gap-4 md:mx-0 md:mt-32">
              <h1 className="text-5xl font-bold">
                Get started <br /> absolutely <br />{' '}
                <span className="bg-gradient-to-r from-[#FFAB00] via-[#00AB55] to-[#00AB55] bg-clip-text text-transparent">
                  for free
                </span>
              </h1>
              <p className="text-2xl text-primary">
                Whether you are <b>a teacher</b> <br /> or a{' '}
                <b>school representative</b>, get the best <br /> out of
                Teachers Directory
              </p>
            </div>
            {isSuccess ? (
              <div className="md:w-4/5">
                <CodeConfirmation
                  error={error?.message}
                  onSubmit={onCodeConfirmation}
                />
              </div>
            ) : (
              <SignUpForm onSubmit={onSubmit} isLoading={isLoading} />
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default SignUp
