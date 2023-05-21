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

  return <AutoComplete field={field} {...rest} />
}
