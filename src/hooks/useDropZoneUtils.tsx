import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export const useDropZoneUtils = () => {
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

  return {
    uploadedFiles,
    getRootProps,
    getInputProps,
    onRemoveFile,
  }
}
