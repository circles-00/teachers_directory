import { useStore } from '@store'

const useSearchStore = useStore

export const useSearchActions = () =>
  useSearchStore((state) => ({
    ...state.searchActions,
  }))

export const useSearchKeyword = () =>
  useSearchStore((state) => state.searchKeyword)
