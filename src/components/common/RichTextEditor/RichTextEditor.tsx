import { BulletList } from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { type FC } from 'react'
import { EditorToolbar } from './components'
interface IRichTextEditorProps {}

export const RichTextEditor: FC<IRichTextEditorProps> = () => {
  const editor = useEditor({
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
    editorProps: {
      attributes: {
        class:
          'Editor border-[1px] rounded-b-lg border-t-[#0000003D] border-[#8E9BAF] pt-4 pb-16 px-6 text-sm hover:none',
      },
    },
  })

  if (!editor) return null

  return (
    <div>
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
