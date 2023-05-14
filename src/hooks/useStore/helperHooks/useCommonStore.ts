import { useStore } from '@store'

const useCommonStore = useStore

export const useCommonActions = () =>
  useCommonStore((state) => ({
    ...state.commonActions,
  }))

export const useIsMobileDrawerOpen = () =>
  useCommonStore((state) => state.isMobileDrawerOpen)
