import { type FC } from 'react'
import { formatLongString, getFileSizeInMB } from '@utils'
import { format } from 'date-fns'
import { DocumentIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { PdfIcon, WordIcon } from '@components'

const Icon: FC<{ fileType: string }> = ({ fileType }) => {
  if (fileType.includes('pdf')) return <PdfIcon />
  if (fileType.includes('image')) return <PhotoIcon className="h-8 w-8" />
  if (fileType.includes('word')) return <WordIcon />

  return <DocumentIcon className="h-8 w-8" />
}

interface IFilesListProps {
  uploadedFiles: File[]
  onRemoveFile: (index: number) => void
}

export const FilesList: FC<IFilesListProps> = ({
  uploadedFiles,
  onRemoveFile,
}) => {
  return (
    <div className="mt-4 flex flex-col gap-2">
      {uploadedFiles.map((file, index) => (
        <div
          className="flex items-center justify-between bg-[#00AB550D] py-4 px-4"
          key={index}
        >
          <div className="flex w-4/12 items-center gap-4">
            <Icon fileType={file.type} />
            <div className="tooltip" data-tip={file.name}>
              <p>{formatLongString(file.name, 20)}</p>
            </div>
          </div>
          <p className="text-[#637381]">{`${getFileSizeInMB(file)} MB`}</p>
          <p className="text-[#637381]">
            {format(new Date(file.lastModified), 'dd LLL Y')}
          </p>
          <button className="mr-2" onClick={() => onRemoveFile(index)}>
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  )
}
