import { type FC } from 'react'
import { Logo } from '@components/svgs'
import Link from 'next/link'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

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
      <div className="ml-8 flex h-16 items-center md:ml-52">
        <Link href="/">
          <Logo />
        </Link>
        <ul className="ml-8 hidden items-center gap-10 md:flex">
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
      <div className="mr-6 flex items-center text-sm md:mr-52">
        <button className="mr-4 hidden rounded-lg border-[1px] border-primaryTransparent-28 py-[6px] px-[16px] text-primary md:block">
          <b>Login</b>
        </button>
        <button className="rounded-lg bg-primary py-[6px] px-[16px] text-white">
          <b>Register</b>
        </button>
        <Link className="sm:block md:hidden" href="/search">
          <MagnifyingGlassIcon className="ml-4 h-6 w-6 text-primary" />
        </Link>
      </div>
    </div>
  )
}
