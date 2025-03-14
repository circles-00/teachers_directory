import Link from 'next/link'
import { type FC } from 'react'

type TLink = {
  title: string
  href: string
  isEmail?: boolean
}

interface VerticalListProps {
  title: string
  links: TLink[]
}

export const VerticalList: FC<VerticalListProps> = ({ title, links }) => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="mb-1 text-base font-bold">{title}</h1>
      {links.map(({ title, href, isEmail }, idx) => (
        <Link key={idx} href={href}>
          <p className={`font-medium ${isEmail ? 'text-primary' : ''}`}>
            {title}
          </p>
        </Link>
      ))}
    </div>
  )
}
