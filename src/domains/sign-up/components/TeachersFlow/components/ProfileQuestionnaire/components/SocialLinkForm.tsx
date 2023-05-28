import { type FC } from 'react'
import { SelectFormField, TextFormField } from '@components'
import { type TFormFieldProps, TrashButton } from '@domains/sign-up'

interface ISocialLinkFormProps {
  onRemove: (index: number) => void
  index: number
  isDisabled: boolean
  platform: TFormFieldProps
  url: TFormFieldProps
}

export const SocialLinkForm: FC<ISocialLinkFormProps> = ({
  onRemove,
  index,
  isDisabled,
  platform,
  url,
}) => {
  return (
    <div className="flex flex-col items-center gap-5 md:flex-row">
      <SelectFormField<string>
        name={platform.name}
        label="Platform"
        containerClassName="self-start w-1/2"
        options={[
          { value: 'Facebook' },
          { value: 'Instagram' },
          { value: 'Twitter' },
          { value: 'LinkedIn' },
          { value: 'My website' },
        ]}
      />
      <TextFormField
        name={url?.name}
        placeholder="https://"
        className="py-[1.65rem]"
        containerClassName="mt-1"
        error={url.errors}
      />
      <TrashButton
        className="self-center"
        index={index}
        onRemove={onRemove}
        isDisabled={isDisabled}
      />
    </div>
  )
}
