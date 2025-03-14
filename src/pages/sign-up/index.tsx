import { api, formResolver, playfairDisplay } from '@utils'
import {
  CodeConfirmation,
  SignUpForm,
  SignUpSchema,
  type TSignUp,
} from '@domains/auth'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import {
  useSignUpAccountType,
  useSignUpActions,
} from '~/hooks/useStore/helperHooks/useSignUpStore'
import { isString } from 'lodash'
import { AuthService } from '@services'
import { type TeachersDirectoryPage } from '~/types/page'

const SignUp: TeachersDirectoryPage = () => {
  const router = useRouter()
  const methods = useForm<TSignUp>({ resolver: formResolver(SignUpSchema) })

  const userEmail = methods.watch('email')
  const userPassword = methods.watch('password')

  const signUpAccountType = useSignUpAccountType()
  const accountTypeRoute = `/sign-up/${signUpAccountType?.toLowerCase() ?? ''}`

  const { setSignUpSuccessMessage } = useSignUpActions()

  const {
    mutate,
    isSuccess,
    isLoading,
    error: signUpError,
  } = api.auth.signUp.useMutation()

  const { mutate: confirmCode, error: confirmationError } =
    api.auth.verifyAccount.useMutation({
      onSuccess: async () => {
        await AuthService.signInWithCredentials({
          username: userEmail,
          password: userPassword,
        })

        setSignUpSuccessMessage(
          'Account created successfully. You may now login!'
        )
        router.push(accountTypeRoute).catch((err) => console.error(err))
      },
    })

  const email = methods.watch('email')

  const onSubmit = (data: TSignUp) => {
    let payload = { ...data }
    if (isString(signUpAccountType)) {
      payload = {
        ...data,
        role: signUpAccountType,
      }
    }

    mutate(payload)
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
              <h1
                className={`text-5xl font-bold text-primary ${playfairDisplay.className}`}
              >
                Get started <br /> absolutely <br />{' '}
                <span className="bg-gradient-to-r from-[#FFAB00] via-[#00AB55] to-[#00AB55] bg-clip-text text-transparent">
                  for free
                </span>
              </h1>
              <p className="text-2xl">
                Whether you are <b>a teacher</b> <br /> or a{' '}
                <b>school representative</b>, get the best <br /> out of
                Teachers Directory
              </p>
            </div>
            {isSuccess ? (
              <div className="md:w-4/5">
                <CodeConfirmation
                  email={email}
                  error={confirmationError?.message}
                  onSubmit={onCodeConfirmation}
                />
              </div>
            ) : (
              <SignUpForm error={signUpError?.message} isLoading={isLoading} />
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default SignUp
