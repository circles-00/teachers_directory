import {
  type FieldValues,
  type Path,
  useController,
  useFormContext,
} from 'react-hook-form'
import { type IInputProps, Input } from '~/components'

interface TextFormFieldProps<T extends FieldValues> extends IInputProps<T> {
  name: Path<T>
}

export const TextFormField = <T extends FieldValues>({
  name,
  error,
  ...props
}: TextFormFieldProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const { field } = useController({ name, control })

  return (
    <Input
      {...props}
      {...field}
      error={error ?? (errors[name]?.message as string)}
    />
  )
}
