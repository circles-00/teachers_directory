import { type FC, useCallback, useState } from 'react'
import { Header } from '@domains/sign-up'
import IllustrationUpload from '@assets/illustration_upload.png'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { FilesList } from './FilesList'

interface IUploadFilesProps {}

export const UploadFiles: FC<IUploadFilesProps> = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const onDrop = useCallback(
    (files: File[]) => {
      setUploadedFiles([...uploadedFiles, ...files])
    },
    [uploadedFiles]
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const onRemoveFile = (index: number) => {
    const newUploadedFiles = [...uploadedFiles]
    newUploadedFiles.splice(index, 1)
    setUploadedFiles(newUploadedFiles)
  }

  return (
    <div className="mt-8">
      <Header
        title={'Upload your files'}
        description={`This is a great opportunity to show case your work or your achievements. You may want to upload your CV, example of things you have produce etc..`}
      />
      <div
        {...getRootProps()}
        className="mt-7 flex items-center gap-4 rounded-lg border-[1px] border-dashed border-[#919EAB52] py-10 px-4"
      >
        <Image
          src={IllustrationUpload.src}
          width={IllustrationUpload.width}
          height={IllustrationUpload.height}
          alt={'Illustration Upload'}
        />
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold">Select files</h3>
          <p className="font-medium text-[#637381]">
            Drop files here or click <input {...getInputProps()} />
            <button className="text-primary">browse</button> thorough your
            machine
          </p>
        </div>
      </div>

      <FilesList uploadedFiles={uploadedFiles} onRemoveFile={onRemoveFile} />
    </div>
  )
}
