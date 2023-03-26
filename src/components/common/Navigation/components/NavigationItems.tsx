import Link from 'next/link'
import { type FC } from 'react'

interface INavigationItemsProps {
  className?: string
}

export const navigationItems = [
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

export const NavigationItems: FC<INavigationItemsProps> = ({ className }) => {
  return (
    <ul className={className}>
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
  )
}
