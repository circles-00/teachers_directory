import { type FC } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { AutoComplete, type IAutoCompleteProps } from '@components'

interface IAutoCompleteFormFieldProps
  extends Omit<IAutoCompleteProps, 'field'> {
  name: string
}

export const AutoCompleteFormField: FC<IAutoCompleteFormFieldProps> = ({
  name,
  ...rest
}) => {
  const { control } = useFormContext()
  const { field } = useController({ name, control })

  return (
    // TODO: Refactor this
    <AutoComplete
      field={{
        ...field,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        value: { value: field.value },
        onChange: ({ value }) => field.onChange(value),
      }}
      {...rest}
    />
  )
}
