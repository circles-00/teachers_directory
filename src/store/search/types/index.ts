export interface ISearchActions {
  setSearchKeyword: (keyword: string) => void
}

export interface ISearchState {
  searchActions: ISearchActions
  searchKeyword: string
}

export type TSearchSlice = ISearchState
