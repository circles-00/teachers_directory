import { type IRichTextEditorProps, RichTextEditor } from '~/components'
import { type Path, useController, useFormContext } from 'react-hook-form'

interface IRichTextEditorFormFieldProps<T> extends IRichTextEditorProps {
  name: Path<T>
}

export const RichTextEditorFormField = <T,>({
  name,
  ...props
}: IRichTextEditorFormFieldProps<T>) => {
  const { control } = useFormContext()
  const { field } = useController({ name, control })

  return <RichTextEditor {...field} {...props} />
}
