import {
  type FieldValues,
  type Path,
  useController,
  useFormContext,
} from 'react-hook-form'
import { type ITextAreaProps, TextArea } from '@components/common'

interface ITextAreaFormFieldProps<T extends FieldValues>
  extends ITextAreaProps {
  name: Path<T>
}

export const TextAreaFormField = <T extends FieldValues>({
  name,
  error,
  ...props
}: ITextAreaFormFieldProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const { field } = useController({ name, control })

  return (
    <TextArea
      {...props}
      {...field}
      error={error ?? (errors[name]?.message as string)}
    />
  )
}
