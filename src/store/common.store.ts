import { create } from 'zustand'

interface ICommonStore {
  isMobileDrawerOpen: boolean
  setIsMobileDrawerOpen: (isOpen: boolean) => void
}

export const useCommonStore = create<ICommonStore>((set) => ({
  isMobileDrawerOpen: false,
  setIsMobileDrawerOpen: (isOpen: boolean) =>
    set({ isMobileDrawerOpen: isOpen }),
}))
