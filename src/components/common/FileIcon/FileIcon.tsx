import { type FC } from 'react'
import { PdfIcon, WordIcon } from '@components'
import { DocumentIcon, PhotoIcon } from '@heroicons/react/24/outline'

interface FileIconProps {
  fileType: string
}
export const FileIcon: FC<FileIconProps> = ({ fileType }) => {
  if (fileType.includes('pdf')) return <PdfIcon />
  if (fileType.includes('image')) return <PhotoIcon className="h-8 w-8" />
  if (fileType.includes('word')) return <WordIcon />

  return <DocumentIcon className="h-8 w-8" />
}
