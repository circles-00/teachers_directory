import { type FC } from 'react'
import { StarIcon } from '@components'
import { useDropZoneUtils } from '~/hooks'
import { formatLongString } from '@utils'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FileIcon } from '@components/common/FileIcon'

interface IBadgeProps {
  title: string
  description: string
}

export const Badge: FC<IBadgeProps> = ({ title, description }) => {
  const { uploadedFiles, onRemoveFile, getInputProps, getRootProps } =
    useDropZoneUtils()

  return (
    <div className="flex flex-col rounded-lg shadow-md">
      <div
        className="flex flex-col justify-between gap-10 py-6 px-4 md:flex-row"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="h-4 w-4">
          <StarIcon />
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-colorText">{description}</p>
        </div>
        <button className="mt-4 h-16 rounded-md bg-[#00AB5529] px-6 font-bold text-primary">
          Upload
        </button>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-4 flex w-full flex-col gap-2 pb-6 md:ml-16 md:w-9/12">
          {uploadedFiles.map((file, index) => (
            <div
              className="flex items-center justify-between rounded-lg bg-[#00AB550D] py-4 px-4"
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
              <button className="mr-2" onClick={() => onRemoveFile(index)}>
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
