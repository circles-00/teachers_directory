import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createCommonSlice, type TCommonSlice } from '~/store/common'
import { createAuthSlice, type TAuthSlice } from '~/store/auth'
import { type TSearchSlice } from './search/types'
import { createSearchSlice } from './search/slice'

export type TState = TCommonSlice & TAuthSlice & TSearchSlice

export const useStore = create<TState>()(
  devtools(
    persist(
      immer((...libMethods) => ({
        ...createCommonSlice(...libMethods),
        ...createAuthSlice(...libMethods),
        ...createSearchSlice(...libMethods),
      })),
      {
        storage: createJSONStorage(() => sessionStorage),
        name: 'store',
        partialize: (state: TState) =>
          Object.fromEntries(
            Object.entries(state).filter(([key]) => !key.includes('Actions'))
          ),
      }
    )
  )
)
