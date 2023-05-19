/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { type StateCreator } from 'zustand'
import { type TCommonSlice, type ICommonState } from './types'
import { type TState } from '~/store/store'

const initialState: Omit<ICommonState, 'commonActions'> = {
  isMobileDrawerOpen: false,
}

export const createCommonSlice: StateCreator<
  TState,
  [
    ['zustand/devtools', never],
    ['zustand/persist', unknown],
    ['zustand/immer', never]
  ],
  [],
  TCommonSlice
> = (set) => ({
  ...initialState,
  commonActions: {
    setIsMobileDrawerOpen: (isOpen: boolean) => {
      set(
        (state) => {
          state.isMobileDrawerOpen = isOpen
        },
        false,
        'setIsMobileDrawerOpen'
      )
    },
  },
})
