import { useCallback, type FC, useState } from 'react'
import { CameraIcon, CropImage, RoundedContainer } from '@components'
import { useDropzone } from 'react-dropzone'
import { convertFileToBase64 } from '@utils'
import isEmpty from 'lodash.isempty'

export interface IProfilePictureProps {
  onChange?: (base64: string) => void
  value?: string
  errors?: string
}

export const ProfilePicture: FC<IProfilePictureProps> = ({
  value,
  onChange,
  errors,
}) => {
  const [image, setImage] = useState('')
  const [isCropping, setIsCropping] = useState(false)

  const onDrop = useCallback((files: File[]) => {
    if (!files[0]) return

    const file = files[0]
    convertFileToBase64(file)
      .then((backgroundBase64) => {
        setImage(backgroundBase64)
        setIsCropping(true)
      })
      .catch((error) => console.error(error))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/jpg': [],
      'image/png': [],
      'image/gif': [],
    },
    maxFiles: 1,
  })

  const onCropSubmit = useCallback(
    (croppedImage: string) => {
      onChange && onChange(croppedImage)
      setIsCropping(false)
    },
    [onChange]
  )

  return (
    <div className="md:w-full">
      <CropImage
        onSubmit={onCropSubmit}
        initialImage={image ?? ''}
        open={isCropping}
        onClose={() => setIsCropping(false)}
      />
      <RoundedContainer className="items-center justify-center pt-10 pb-6 md:w-full">
        <div
          {...getRootProps()}
          // ! Note: Using inline style for backgrounds, due to Tailwind dynamic classNames behaviour
          // ! https://tailwindcss.com/docs/content-configuration#dynamic-class-names
          style={{
            backgroundImage: !isDragActive ? `url(${value ?? ''})` : '',
            backgroundSize: 'cover',
            backgroundColor: '#F4F6F8',
            backgroundPosition: 'center',
          }}
          className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-full border-[1px] outline outline-dotted outline-offset-8 outline-[#919EAB52]"
        >
          {(isEmpty(value) || isDragActive) && (
            <>
              <CameraIcon />
              <p className="text-xs text-[#919EAB]">
                {isDragActive ? 'Drop file' : 'Upload photo'}
              </p>
            </>
          )}
          <input {...getInputProps()} type="file" />
        </div>
        <p className="mt-8 w-2/4 text-center text-xs text-[#637381]">
          Allowed *.jpeg, *.jpg, *.png, *.gif Max size of 3.1 MB
        </p>
      </RoundedContainer>
      {!!errors && (
        <p className="mt-2 text-center text-sm text-danger">{errors}</p>
      )}
    </div>
  )
}
