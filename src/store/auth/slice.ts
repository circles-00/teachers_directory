import { type StateCreator } from 'zustand'
import {
  type IAuthState,
  type TAuthSlice,
  type TSignupAccountType,
} from '~/store/auth/types'
import { type TState } from '~/store/store'

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
    setSignUpAccountType: (accountType?: TSignupAccountType) => {
      set(
        (state) => {
          state.signUpAccountType = accountType
        },
        false,
        'setSignUpAccountType'
      )
    },
    resetSignUpAccountType: () => {
      set(
        (state) => {
          state.signUpAccountType = undefined
        },
        false,
        'resetSignUpAccountType'
      )
    },
  },
})
