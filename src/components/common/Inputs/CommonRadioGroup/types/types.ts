export type Option = {
  value: boolean
  label: string
}

export interface CommonRadioGroupProps {
  options: Option[]
  value?: boolean
  onChange?: (value: boolean) => void
  className?: string
}
