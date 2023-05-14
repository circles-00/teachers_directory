export type TSignupAccountType = 'school' | 'teacher' | 'general'

export interface IAuthActions {
  setSignUpAccountType: (accountType?: TSignupAccountType) => void
}

export interface IAuthState {
  authActions: IAuthActions
  signUpAccountType?: TSignupAccountType
}

export type TAuthSlice = IAuthState
