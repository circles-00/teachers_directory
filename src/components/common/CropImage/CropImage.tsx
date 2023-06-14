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
  const [rotation, setRotation] = useState(0)

  const [croppedArea, setCroppedArea] = useState<Area>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  })

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels)
  }, [])

  const handleCloseDialog = useCallback(() => {
    onClose()
    setZoom(1)
    setCrop({ x: 0, y: 0 })
    setRotation(0)
  }, [onClose])

  const onHandleSubmit = useCallback(async () => {
    const croppedImage = await getCroppedImg(
      initialImage,
      croppedArea,
      rotation
    )

    onSubmit(croppedImage ?? '')
    handleCloseDialog()
  }, [onSubmit, croppedArea, initialImage, rotation, handleCloseDialog])

  return (
    <CommonDialog open={open} onClose={handleCloseDialog}>
      <div className="flex flex-col">
        <div className="relative h-72 w-full">
          <Cropper
            style={{ containerStyle: { width: '100%', height: '250px' } }}
            image={initialImage}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onCropChange={setCrop}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p>Zoom:</p>
            <RangeSlider
              step={1}
              max={100}
              value={[zoom]}
              defaultValue={[zoom]}
              min={1}
              onValueChange={([value]) => setZoom(value as number)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Rotation:</p>
            <RangeSlider
              step={1}
              max={100}
              value={[rotation]}
              defaultValue={[rotation]}
              min={1}
              onValueChange={([value]) => setRotation(value as number)}
            />
          </div>
        </div>

        <ButtonContained onClick={onHandleSubmit} className="mt-4 ml-auto px-5">
          Save
        </ButtonContained>
      </div>
    </CommonDialog>
  )
}
