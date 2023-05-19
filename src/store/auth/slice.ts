import { type StateCreator } from 'zustand'
import { type IAuthState, type TAuthSlice } from '~/store/auth/types'
import { type TState } from '~/store/store'
import { type TUserRole } from '@shared'

const initialState: Omit<IAuthState, 'authActions'> = {}

export const createAuthSlice: StateCreator<
  TState,
  [
    ['zustand/devtools', never],
    ['zustand/persist', unknown],
    ['zustand/immer', never]
  ],
  [],
  TAuthSlice
> = (set) => ({
  ...initialState,
  authActions: {
    setSignUpAccountType: (accountType?: TUserRole) => {
      set(
        (state) => {
          state.signUpAccountType = accountType
        },
        false,
        'setSignUpAccountType'
      )
    },
    setSignUpSuccessMessage: (message: string) => {
      set(
        (state) => {
          state.signUpSuccessMessage = message
        },
        false,
        'setSignUpSuccessMessage'
      )
    },
    resetSignUpAccountType: () => {
      set(
        (state) => {
          state.signUpAccountType = undefined
          state.signUpSuccessMessage = undefined
        },
        false,
        'resetSignUpAccountType'
      )
    },
  },
})
