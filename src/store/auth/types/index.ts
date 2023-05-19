import { type TUserRole } from '@shared'

export interface IAuthActions {
  setSignUpAccountType: (accountType?: TUserRole) => void
  setSignUpSuccessMessage: (message: string) => void
}

export interface IAuthState {
  authActions: IAuthActions
  signUpSuccessMessage?: string
  signUpAccountType?: TUserRole
}

export type TAuthSlice = IAuthState
