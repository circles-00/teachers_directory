import Link from 'next/link'
import { type FC } from 'react'
import { Logo } from '../../svgs'
import { SocialIcons } from '../SocialIcons'
import { VerticalList } from './components'
import { useFooterData } from './hooks'
import { useLabels, inter } from '@utils'

interface IFooterProps {}

export const Footer: FC<IFooterProps> = () => {
  const { homeLinks, legalLinks, contactLinks } = useFooterData()
  const { labels } = useLabels()

  return (
    <div className={`w-full bg-[#F2F7F2] ${inter.className}`}>
      <div className="flex flex-col py-14 px-10 md:flex-row 2xl:mx-20 2xl:pl-0">
        <div className="flex flex-col gap-6">
          <Link href="/">
            <Logo color="#F99012" />
          </Link>
          <p className="font-semibold">
            © All rights reserved made by{' '}
            <Link href={labels.appUrl} target="_blank" className="text-primary">
              {labels.appUrl}
            </Link>
          </p>
          <SocialIcons isBw className="ml-[-15px] flex justify-start md:mt-6" />
        </div>
        <div className="mt-10 flex flex-col gap-10 md:mt-0 md:ml-60 md:flex-row md:gap-32">
          <VerticalList links={homeLinks} title="HOME" />
          <VerticalList links={legalLinks} title="LEGAL" />
          <VerticalList links={contactLinks} title="CONTACT" />
        </div>
      </div>
    </div>
  )
}
