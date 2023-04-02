import Link from 'next/link'
import { type FC } from 'react'
import { Logo } from '../../svgs'
import { SocialIcons } from '../SocialIcons'
import { VerticalList } from './components'
import { useFooterData } from './hooks'

interface IFooterProps {}

export const Footer: FC<IFooterProps> = () => {
  const { homeLinks, legalLinks, contactLinks } = useFooterData()

  return (
    <div className="w-full bg-primaryTransparent-16">
      <div className="container mx-auto flex flex-col px-4 py-14 md:flex-row">
        <div className="flex flex-col gap-6">
          <Link href="/">
            <Logo color="#F99012" />
          </Link>
          <p className="text-sm font-bold">
            © All rights reserved made by{' '}
            <Link
              href="https://qualifiedteachers.co.uk"
              target="_blank"
              className="text-primary"
            >
              qualifiedteachers.co.uk
            </Link>
          </p>
          <SocialIcons className="ml-[-15px] flex justify-start" />
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
