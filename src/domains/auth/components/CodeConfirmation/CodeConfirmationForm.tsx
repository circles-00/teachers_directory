import {
  useState,
  type FC,
  useRef,
  useEffect,
  type ClipboardEvent,
} from 'react'
import { generateArray } from '@utils'
import isEmpty from 'lodash.isempty'

interface ICodeConfirmationFormProps {
  onSubmit: (code: string) => void
  isCodeCorrect?: boolean
}

export const CodeConfirmationForm: FC<ICodeConfirmationFormProps> = ({
  onSubmit,
  isCodeCorrect,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const [confirmationCode, setConfirmationCode] = useState<number[]>(
    generateArray(6).map(() => -1)
  )

  useEffect(() => {
    if (confirmationCode.every((code) => code !== -1)) {
      inputRefs.current.map((ref) => ref?.blur())
      onSubmit(confirmationCode.join(''))
    }
  }, [confirmationCode, onSubmit])

  const handleOnChange = (idx: number, value: string) => {
    const newConfirmationCode = [...confirmationCode]
    if (
      (parseInt(value) < 0 && !isEmpty(value)) || // if value is negative & not empty
      (isNaN(parseInt(value)) && !isEmpty(value)) || // if value is not a number & not empty
      idx < 0 ||
      idx >= confirmationCode.length
    )
      return

    // if value is empty, focus on previous input
    if (isEmpty(value)) {
      newConfirmationCode[idx] = -1
      inputRefs.current[idx - 1]?.focus()
    } else {
      // if value is not empty, focus on next input
      newConfirmationCode[idx] = parseInt(value)
      inputRefs.current[idx + 1]?.focus()
    }
    setConfirmationCode(newConfirmationCode)
  }

  const eventHandler = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const clipboardData = event.clipboardData.getData('text')

    if (
      clipboardData.length !== 6 ||
      Number.isNaN(Number.parseInt(clipboardData))
    )
      return
    setConfirmationCode(
      clipboardData.split('').map((el) => Number.parseInt(el))
    )
  }

  return (
    <div className="flex justify-center gap-3.5 md:gap-6">
      {generateArray(6).map((idx) => (
        <input
          onPaste={(event) => idx === 0 && eventHandler(event)}
          key={idx}
          type="tel"
          disabled={isCodeCorrect}
          autoFocus={idx === 0}
          ref={(ref) => (inputRefs.current[idx] = ref)}
          placeholder="-"
          value={confirmationCode[idx] !== -1 ? confirmationCode[idx] : ''}
          onChange={(event) => handleOnChange(idx, event.target.value)}
          maxLength={1}
          className={`h-12 w-12 rounded-md border-[1px] border-gray-300 text-center ${
            isCodeCorrect ? 'cursor-not-allowed' : ''
          }`}
        />
      ))}
    </div>
  )
}
