import { type FC } from 'react'
import { PdfIcon, WordIcon, PngIcon, JpegIcon, JpgIcon } from '@components'
import { DocumentIcon } from '@heroicons/react/24/outline'

interface FileIconProps {
  fileType: string
}
export const FileIcon: FC<FileIconProps> = ({ fileType }) => {
  if (fileType.includes('pdf')) return <PdfIcon />
  if (fileType.includes('jpeg')) return <JpegIcon />
  if (fileType.includes('png')) return <PngIcon />
  if (fileType.includes('word')) return <WordIcon />

  return <DocumentIcon className="h-8 w-8" />
}
