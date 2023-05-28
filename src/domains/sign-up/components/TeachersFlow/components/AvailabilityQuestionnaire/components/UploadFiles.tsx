import { type FC } from 'react'
import { Header } from '@domains/sign-up'
import IllustrationUpload from '@assets/illustration_upload.png'
import Image from 'next/image'
import { FilesList } from './FilesList'
import { useDropZoneUtils } from '~/hooks'
import { convertBase64ToFile, convertFileToBase64 } from '@utils'
import { useUpdate } from '@rounik/react-custom-hooks'

type TFile = {
  name: string
  content: string
}

interface IUploadFilesProps {
  initialValue?: TFile[]
  onChange?: (value: TFile[]) => void
}

export const UploadFiles: FC<IUploadFilesProps> = ({
  onChange,
  initialValue,
}) => {
  const {
    uploadedFiles,
    onRemoveFile,
    getInputProps,
    getRootProps,
    setUploadedFiles,
  } = useDropZoneUtils()

  useUpdate(() => {
    // Only run initially
    if (initialValue) {
      setUploadedFiles(
        initialValue.map((el) => convertBase64ToFile(el.content, el.name))
      )
    }
  }, [initialValue])

  useUpdate(
    async () => {
      const newUploadedFiles = await Promise.all(
        uploadedFiles.map(async (file) => {
          const content = await convertFileToBase64(file)
          return { name: file.name, content }
        })
      )

      onChange && onChange(newUploadedFiles)
    },
    [uploadedFiles],
    true
  )

  return (
    <div className="mt-8">
      <Header
        title={'Upload your files'}
        description={`This is a great opportunity to show case your work or your achievements. You may want to upload your CV, example of things you have produce etc..`}
      />
      <div
        {...getRootProps()}
        className="mt-7 flex flex-col items-center gap-4 rounded-lg border-[1px] border-dashed border-[#919EAB52] py-10 px-4 md:flex-row"
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
