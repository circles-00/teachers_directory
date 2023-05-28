import { HorizontalSelect, type IHorizontalSelectProps } from '~/components'
import { type Path, useController, useFormContext } from 'react-hook-form'

interface IHorizontalSelectFormFieldProps<T> extends IHorizontalSelectProps {
  name: Path<T>
}

export const HorizontalSelectFormField = <T,>({
  name,
  ...props
}: IHorizontalSelectFormFieldProps<T>) => {
  const { control } = useFormContext()
  const { field } = useController({ name, control })

  return <HorizontalSelect {...field} {...props} />
}
