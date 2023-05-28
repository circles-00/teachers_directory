import { type FC } from 'react'

export interface IHorizontalSelectProps {
  options: string[]
  value?: string[]
  onChange?: (value: string[]) => void
}

export const HorizontalSelect: FC<IHorizontalSelectProps> = ({
  options,
  onChange,
  value,
}) => {
  const onSelect = (selectedValue: string) => {
    if (!onChange) return

    if (value?.includes(selectedValue)) {
      onChange(value.filter((item) => item !== selectedValue))
    } else {
      onChange([...(value ?? []), selectedValue])
    }
  }

  return (
    <div className="mt-2 flex w-11/12 justify-between">
      {options.map((option, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            checked={value?.includes(option)}
            onChange={() => onSelect(option)}
            type="checkbox"
            className="h-5 w-5 accent-primary"
          />
          <p>{option}</p>
        </div>
      ))}
    </div>
  )
}
