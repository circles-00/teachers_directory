import { BulletList } from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, type JSONContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { type FC } from 'react'
import { EditorToolbar } from './components'
import { useUpdate } from '@rounik/react-custom-hooks'
export interface IRichTextEditorProps {
  value?: string
  onChange?: (value: JSONContent) => void
}

export const RichTextEditor: FC<IRichTextEditorProps> = ({
  value,
  onChange,
}) => {
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        BulletList.configure({
          HTMLAttributes: {
            class: 'list-disc',
          },
        }),
        OrderedList.configure({
          HTMLAttributes: {
            class: 'list-decimal',
          },
        }),
        Placeholder.configure({
          // NOTE: Please see globals.css for the styles of the placeholder
          placeholder:
            'Write a description about you, your background, and what you offer...',
        }),
      ],
      parseOptions: {
        preserveWhitespace: true,
      },
      editorProps: {
        attributes: {
          class:
            'Editor border-[1px] rounded-b-lg border-t-[#0000003D] border-[#8E9BAF] pt-4 pb-16 px-6 text-sm hover:none',
        },
      },
      onUpdate: ({ editor }) => {
        onChange && onChange(editor.getJSON())
      },
    },
    []
  )

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
