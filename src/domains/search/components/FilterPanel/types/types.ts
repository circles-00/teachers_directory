import { type TTeacher } from '../../../../../server/api/types'

export type TFilterItem = {
  title: string
  value: string
  count?: number
  subItems?: TFilterItem[]
  relation?: keyof TTeacher
  isSpecific?: boolean
}

export type Item = {
  title: string
  items: TFilterItem[]
  relation?: keyof TTeacher
  isNested?: boolean
  nestedRelations?: string[]
}
