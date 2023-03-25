import { type FC } from 'react'
import { Logo } from '@components/svgs'
import Link from 'next/link'

interface INavigationProps {}

const navigationItems = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Search',
    href: '/search',
  },
  {
    title: 'How it works',
    href: '/how-it-works',
  },
  {
    title: 'About us',
    href: '/about-us',
  },
]

export const Navigation: FC<INavigationProps> = () => {
  return (
    <div className="flex justify-between border-b-[1px] border-primaryTransparent-16">
      <div className="ml-52 flex h-16 items-center">
        <Link href="/">
          <Logo />
        </Link>
        <ul className="ml-8 flex items-center gap-10">
          {navigationItems.map((item, idx) => (
            <li key={idx}>
              <Link
                className="text-base text-colorText hover:text-primary"
                href={item.href}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mr-52 flex items-center text-sm">
        <button className="mr-4 rounded-lg border-[1px] border-primaryTransparent-28 py-[6px] px-[16px] text-primary">
          <b>Login</b>
        </button>
        <button className="rounded-lg bg-primary py-[6px] px-[16px] text-white">
          <b>Register</b>
        </button>
      </div>
    </div>
  )
}
