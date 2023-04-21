import { type FC } from 'react'
import { Select, Input, TrashIcon } from '@components'

interface ISocialLinkFormProps {
  onRemove: (index: number) => void
  index: number
  isDisabled: boolean
}

export const SocialLinkForm: FC<ISocialLinkFormProps> = ({
  onRemove,
  index,
  isDisabled,
}) => {
  return (
    <div className="flex items-center gap-5">
      <Select
        containerClassName="w-1/2"
        options={[
          { value: 'Facebook' },
          { value: 'Instagram' },
          { value: 'Twitter' },
        ]}
      />
      <Input
        placeholder="https://"
        className="py-[1.65rem]"
        containerClassName="mt-1"
      />
      <button
        disabled={isDisabled}
        onClick={() => onRemove(index)}
        className={isDisabled ? 'cursor-not-allowed' : ''}
      >
        <TrashIcon
          disabled={isDisabled}
          fillColor={isDisabled ? '' : 'fill-danger'}
          size={{ width: 30, height: 30 }}
        />
      </button>
    </div>
  )
}
