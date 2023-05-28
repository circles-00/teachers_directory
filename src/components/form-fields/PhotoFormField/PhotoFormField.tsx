import { type IProfilePictureProps, ProfilePicture } from '@domains/sign-up'
import { type Path, useController, useFormContext } from 'react-hook-form'

interface IPhotoFormFieldProps<T> extends IProfilePictureProps {
  name: Path<T>
}

export const PhotoFormField = <T,>({ name }: IPhotoFormFieldProps<T>) => {
  const { control, formState } = useFormContext()
  const { field } = useController({ control, name })

  const fieldErrors = formState.errors[name as string]?.message

  return (
    <ProfilePicture {...field} errors={fieldErrors as string}></ProfilePicture>
  )
}
