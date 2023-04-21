import { useCallback, type FC, useState } from 'react'
import { CameraIcon, RoundedContainer } from '@components'
import { useDropzone } from 'react-dropzone'
import { convertFileToBase64 } from '@utils'

interface IProfilePictureProps {}

export const ProfilePicture: FC<IProfilePictureProps> = () => {
  const [background, setBackground] = useState('')

  const onDrop = useCallback((files: File[]) => {
    if (!files[0]) return

    const file = files[0]
    convertFileToBase64(file)
      .then((backgroundBase64) => {
        setBackground(backgroundBase64)
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

  return (
    <RoundedContainer className="items-center justify-center pt-8 pb-4 md:w-full">
      <div
        {...getRootProps()}
        // ! Note: Using inline style for backgrounds, due to Tailwind dynamic classNames behaviour
        // ! https://tailwindcss.com/docs/content-configuration#dynamic-class-names
        style={{
          backgroundImage: !isDragActive ? `url(${background})` : '',
          backgroundSize: 'cover',
          backgroundColor: '#F4F6F8',
          backgroundPosition: 'center',
        }}
        className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-full border-[1px] outline outline-dotted outline-offset-8 outline-[#919EAB52]"
      >
        {(!background || isDragActive) && (
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
  )
}
