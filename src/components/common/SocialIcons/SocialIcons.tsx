import Link from 'next/link'
import { type FC } from 'react'
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '../../svgs'

interface ISocialIconsProps {
  isBw?: boolean
  className?: string
}

export const SocialIcons: FC<ISocialIconsProps> = ({ isBw, className }) => {
  return (
    <div className={className}>
      <Link href="https://facebook.com" target="_blank">
        <FacebookIcon isBw={isBw} />
      </Link>

      <Link href="https://instagram.com" target="_blank">
        <InstagramIcon isBw={isBw} />
      </Link>

      <Link href="https://linkedin.com" target="_blank">
        <LinkedInIcon isBw={isBw} />
      </Link>

      <Link href="https://twitter.com" target="_blank">
        <TwitterIcon isBw={isBw} />
      </Link>
    </div>
  )
}
