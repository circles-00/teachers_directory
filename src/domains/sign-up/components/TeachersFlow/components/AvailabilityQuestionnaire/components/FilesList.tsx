import { type FC } from 'react'
import { formatLongString, getFileSizeInMB } from '@utils'
import { format } from 'date-fns'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FileIcon } from '@components/common/FileIcon'

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
          <div className="flex items-center gap-4">
            <FileIcon fileType={file.type} />
            <div className="tooltip" data-tip={file.name}>
              <p className="hidden md:block">
                {formatLongString(file.name, 20)}
              </p>
              <p className="md:hidden">{formatLongString(file.name, 10)}</p>
            </div>
          </div>
          <p className="hidden text-[#637381] md:block">{`${getFileSizeInMB(
            file
          )} MB`}</p>
          <p className="hidden text-[#637381] md:block">
            {format(new Date(file.lastModified), 'dd LLL Y')}
          </p>
          <button
            type="button"
            className="mr-2"
            onClick={() => onRemoveFile(index)}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  )
}
