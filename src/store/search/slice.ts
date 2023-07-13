import { type StateCreator } from 'zustand'
import { type TState } from '../store'
import { type TSearchSlice, type ISearchState } from './types'

const initialState: Omit<ISearchState, 'searchActions'> = {
  searchKeyword: '',
}

export const createSearchSlice: StateCreator<
  TState,
  [
    ['zustand/devtools', never],
    ['zustand/persist', unknown],
    ['zustand/immer', never]
  ],
  [],
  TSearchSlice
> = (set) => ({
  ...initialState,
  searchActions: {
    setSearchKeyword: (keyword: string) => {
      set(
        (state) => {
          state.searchKeyword = keyword
        },
        false,
        'setSearchKeyword'
      )
    },
  },
})
