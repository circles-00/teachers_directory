import {
  type FieldValues,
  type Path,
  useController,
  useFormContext,
} from 'react-hook-form'
import { type IInputProps, Input } from '@components'

interface UrlFormFieldProps<T extends FieldValues> extends IInputProps<T> {
  name: Path<T>
}

export const UrlFormField = <T extends FieldValues>({
  name,
  error,
  ...props
}: UrlFormFieldProps<T>) => {
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
