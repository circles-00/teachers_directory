import { useStore } from '@store'

const useSignUpStore = useStore

export const useSignUpActions = () =>
  useSignUpStore((state) => ({
    ...state.authActions,
  }))

export const useSignUpSuccessMessage = () =>
  useSignUpStore((state) => state.signUpSuccessMessage)

export const useSignUpAccountType = () =>
  useSignUpStore((state) => state.signUpAccountType)
