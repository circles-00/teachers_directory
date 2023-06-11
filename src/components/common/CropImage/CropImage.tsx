import { type FC, useCallback, useState } from 'react'
import { CommonDialog } from '../CommonDialog'
import Cropper, { type Area, type Point } from 'react-easy-crop'
import { RangeSlider } from '../RangeSlider'
import { ButtonContained } from '../Buttons'
import { getCroppedImg } from './utils/cropImage'

interface ICropImageProps {
  open: boolean
  onClose: () => void
  initialImage: string
  onSubmit: (croppedImage: string) => void
}

export const CropImage: FC<ICropImageProps> = ({
  open,
  onClose,
  initialImage,
  onSubmit,
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedArea, setCroppedArea] = useState<Area>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  })

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedArea(croppedAreaPixels)
    },
    []
  )

  const onHandleSubmit = useCallback(async () => {
    const croppedImage = await getCroppedImg(initialImage, croppedArea)

    onSubmit(croppedImage ?? '')
  }, [onSubmit, croppedArea, initialImage])

  return (
    <CommonDialog open={open} onClose={onClose}>
      <div className="flex flex-col">
        <div className="relative h-72 w-full">
          <Cropper
            style={{ containerStyle: { width: '100%', height: '250px' } }}
            image={initialImage}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onCropChange={setCrop}
          />
        </div>
        <div>
          <RangeSlider
            step={1}
            max={100}
            value={[zoom]}
            defaultValue={[zoom]}
            min={1}
            onValueChange={([value]) => setZoom(value as number)}
          />
        </div>
        <ButtonContained onClick={onHandleSubmit} className="mt-4 ml-auto px-5">
          Save
        </ButtonContained>
      </div>
    </CommonDialog>
  )
}
