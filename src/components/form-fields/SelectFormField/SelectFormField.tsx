import { type ISelectProps, Select } from '~/components'
import { type Path, useController, useFormContext } from 'react-hook-form'

interface ISelectFormFieldProps<T> extends ISelectProps {
  name: Path<T>
}

export const SelectFormField = <T,>({
  name,
  ...props
}: ISelectFormFieldProps<T>) => {
  const { control } = useFormContext()
  const { field } = useController({ name, control })

  return <Select {...props} {...field} />
}
