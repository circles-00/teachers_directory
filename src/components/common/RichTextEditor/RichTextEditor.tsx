import { EditorContent, type JSONContent } from '@tiptap/react'
import { type FC } from 'react'
import { EditorToolbar } from './components'
import { useUpdate } from '@rounik/react-custom-hooks'
import { useEditor } from './hooks'
export interface IRichTextEditorProps {
  value?: string
  onChange?: (value: JSONContent) => void
}

export const RichTextEditor: FC<IRichTextEditorProps> = ({
  value,
  onChange,
}) => {
  const { editor } = useEditor({ onChange })

  // This is a workaround for settings the initial value of the editor
  // Read more here: https://github.com/ueberdosis/tiptap/issues/1451#issuecomment-941988769
  useUpdate(() => {
    if (!editor) return

    if (!editor.isDestroyed) {
      editor
        .chain()
        .focus()
        .setContent(value ?? '')
        .run()
    }
  }, [editor, value])

  if (!editor) return null

  return (
    <div>
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
