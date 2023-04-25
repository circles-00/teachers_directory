import { type FC } from 'react'
import { Select, Input } from '@components'
import { TrashButton } from '@domains/sign-up'

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
    <div className="flex flex-col items-center gap-5 md:flex-row">
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
      <TrashButton index={index} onRemove={onRemove} isDisabled={isDisabled} />
    </div>
  )
}
