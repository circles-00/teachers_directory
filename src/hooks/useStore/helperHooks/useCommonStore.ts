import { useStore } from '~/store/store'

const useCommonStore = useStore

export const useCommonActions = () =>
  useCommonStore((state) => ({
    ...state.commonActions,
  }))

export const useCommonState = () =>
  useCommonStore((state) => ({
    ...state,
  }))
