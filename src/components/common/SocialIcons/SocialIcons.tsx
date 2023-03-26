import Link from 'next/link'
import { type FC } from 'react'
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '../../svgs'

interface ISocialIconsProps {
  className?: string
}

export const SocialIcons: FC<ISocialIconsProps> = ({ className }) => {
  return (
    <div className={className}>
      <Link href="https://facebook.com" target="_blank">
        <FacebookIcon />
      </Link>

      <Link href="https://instagram.com" target="_blank">
        <InstagramIcon />
      </Link>

      <Link href="https://linkedin.com" target="_blank">
        <LinkedInIcon />
      </Link>

      <Link href="https://twitter.com" target="_blank">
        <TwitterIcon />
      </Link>
    </div>
  )
}
