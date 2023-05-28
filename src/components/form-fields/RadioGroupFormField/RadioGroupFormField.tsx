import { type CommonRadioGroupProps } from '@components/common/Inputs/CommonRadioGroup/types'
import { type Path, useController, useFormContext } from 'react-hook-form'
import { CommonRadioGroup } from '~/components'

interface IRadioGroupFormFieldProps<T> extends CommonRadioGroupProps {
  name: Path<T>
}

export const RadioGroupFormField = <T,>({
  name,
  ...props
}: IRadioGroupFormFieldProps<T>) => {
  const { control } = useFormContext()
  const { field } = useController({ name, control })

  return <CommonRadioGroup {...field} {...props} />
}
