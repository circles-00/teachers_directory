import { type FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { type IInputProps, Input } from '~/components'

interface TextFormFieldProps extends IInputProps {
  name: string
}

export const TextFormField: FC<TextFormFieldProps> = ({ name, ...props }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <Input
          {...props}
          field={field}
          error={errors[name]?.message as string}
        />
      )}
    />
  )
}
