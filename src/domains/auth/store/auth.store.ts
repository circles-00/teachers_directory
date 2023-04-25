import { create } from 'zustand'

interface IAuthStore {
  signUpSuccessMessage: string
  setSignUpSuccessMessage: (message: string) => void
}

export const useAuthStore = create<IAuthStore>((set) => ({
  signUpSuccessMessage: '',
  setSignUpSuccessMessage: (message: string) =>
    set({ signUpSuccessMessage: message }),
}))
