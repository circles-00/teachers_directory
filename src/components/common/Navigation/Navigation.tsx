import { type FC } from 'react'
import { Logo } from '@components/svgs'
import Link from 'next/link'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { HamburgerIcon } from './components/HamburgerIcon'
import { NavigationItems } from './components/NavigationItems'

interface INavigationProps {}

export const Navigation: FC<INavigationProps> = () => {
  return (
    <div className="flex justify-between border-b-[1px] border-primaryTransparent-16">
      <div className="ml-4 flex h-16 items-center md:ml-52">
        <HamburgerIcon />
        <Link href="/">
          <Logo />
        </Link>
        <NavigationItems className="ml-8 hidden items-center gap-10 md:flex" />
      </div>
      <div className="mr-4 flex items-center text-sm md:mr-52">
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
