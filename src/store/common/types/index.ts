export interface ICommonActions {
  setIsMobileDrawerOpen: (isOpen: boolean) => void
}

export interface ICommonState {
  commonActions: ICommonActions
  isMobileDrawerOpen: boolean
}

export type TCommonSlice = ICommonState
