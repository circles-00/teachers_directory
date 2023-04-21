import { type FC } from 'react'
import { BoldIcon, ItalicIcon, DecimalListIcon, BulletListIcon } from '../icons'
import { type Editor } from '@tiptap/core'

interface IEditorToolbarProps {
  editor: Editor
}

export const EditorToolbar: FC<IEditorToolbarProps> = ({ editor }) => {
  return (
    <div className="flex rounded-t-lg border-[1px] border-b-0 border-[#8E9BAF] py-1 pl-4">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`mr-1 p-2 ${editor.isActive('bold') ? 'bg-slate-700' : ''}`}
      >
        <BoldIcon fillColor={editor.isActive('bold') ? 'fill-white' : null} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`mr-1 p-2 ${
          editor.isActive('italic') ? 'bg-slate-700' : ''
        }`}
      >
        <ItalicIcon
          fillColor={editor.isActive('italic') ? 'fill-white' : null}
        />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`mr-1 p-2 ${
          editor.isActive('orderedList') ? 'bg-slate-700' : ''
        }`}
      >
        <DecimalListIcon
          fillColor={editor.isActive('orderedList') ? 'fill-white' : null}
        />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`mr-1 p-2 ${
          editor.isActive('bulletList') ? 'bg-slate-700' : ''
        }`}
      >
        <BulletListIcon
          fillColor={editor.isActive('bulletList') ? 'fill-white' : null}
        />
      </button>
    </div>
  )
}
