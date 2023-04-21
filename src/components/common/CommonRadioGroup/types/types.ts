export type Option<T> = {
  value: T
  label: string
}

export interface CommonRadioGroupProps<T> {
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
}
