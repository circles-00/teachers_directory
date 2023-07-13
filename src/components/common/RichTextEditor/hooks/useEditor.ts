import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Placeholder from '@tiptap/extension-placeholder'
import { useEditor as useTipTapEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { type IUseEditorArgs } from '../types'

export const useEditor = (props?: IUseEditorArgs) => {
  const editor = useTipTapEditor(
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
        props?.onChange && props?.onChange(editor.getJSON())
      },
    },
    []
  )

  return { editor }
}
