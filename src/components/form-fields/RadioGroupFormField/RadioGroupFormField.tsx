import { type CommonRadioGroupProps } from '@components/common/Inputs/CommonRadioGroup/types'
import { type Path, useController, useFormContext } from 'react-hook-form'
import { CommonRadioGroup } from '~/components'

interface IRadioGroupFormFieldProps<T, U> extends CommonRadioGroupProps<T> {
  name: Path<U>
}

export const RadioGroupFormField = <T, U>({
  name,
  ...props
}: IRadioGroupFormFieldProps<T, U>) => {
  const { control } = useFormContext()
  const { field } = useController({ name, control })

  return <CommonRadioGroup<T> {...field} {...props} />
}
