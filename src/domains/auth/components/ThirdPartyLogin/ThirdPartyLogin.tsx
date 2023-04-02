import { type FC } from 'react'
import { FacebookIcon, GoogleIcon, TwitterIcon } from '@components/svgs'
import { useLabels } from '@utils'

interface IThirdPartyLoginProps {}

const Divider = () => <div className="h-[1px] w-3/5 bg-[#919EAB3D]" />

export const ThirdPartyLogin: FC<IThirdPartyLoginProps> = () => {
  const { labels } = useLabels()
  return (
    <div>
      <div className="flex items-center">
        <Divider />
        <p className="mx-3 text-xs">{labels.or}</p>
        <Divider />
      </div>
      <div className="mt-2 flex items-center justify-center gap-4">
        <GoogleIcon />
        <FacebookIcon />
        <div className="ml-[-10px]">
          <TwitterIcon />
        </div>
      </div>
    </div>
  )
}
