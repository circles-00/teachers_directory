export type TFilterItem = {
  title: string
  value: string
  count?: number
  subItems?: TFilterItem[]
}

export type Item = {
  title: string
  items: TFilterItem[]
}
