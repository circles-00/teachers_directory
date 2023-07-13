import { type JSONContent } from '@tiptap/core'

export interface RichTextEditorProps {}

export interface EditorIconProps {
  fillColor?: string | null
}

export interface IUseEditorArgs {
  onChange?: (value: JSONContent) => void
}
