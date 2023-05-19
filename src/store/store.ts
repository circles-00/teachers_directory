import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createCommonSlice, type TCommonSlice } from '~/store/common'
import { createAuthSlice, type TAuthSlice } from '~/store/auth'
import { createPagesSlice, TPagesSlice } from "~/store/pages";

export type TState = TCommonSlice & TAuthSlice & TPagesSlice

export const useStore = create<TState>()(
  devtools(
    persist(
      immer((...libMethods) => ({
        ...createCommonSlice(...libMethods),
        ...createAuthSlice(...libMethods),
        ...createPagesSlice(...libMethods),
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
