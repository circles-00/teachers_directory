import { type FC } from 'react'
import { Logo } from '@components/svgs'
import Link from 'next/link'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { HamburgerIcon } from './components/HamburgerIcon'
import { NavigationItems } from './components/NavigationItems'
import { useRouter } from 'next/router'
import { useLabels } from '@utils'
import { Can } from '@components/auth'
import Image from 'next/image'
import { useUser } from '~/hooks/useAuth'
import isEmpty from 'lodash.isempty'
interface INavigationProps {}

export const Navigation: FC<INavigationProps> = () => {
  const router = useRouter()
  const { labels } = useLabels()
  const { user } = useUser()

  const onHandleLoginClick = () => {
    router.push('/login').catch((err) => console.error(err))
  }

  const onHandleSignUpClick = () => {
    router.push('/sign-up/account-type').catch((err) => console.error(err))
  }

  return (
    <div className="flex justify-between border-b-[1px] border-[#d5e0d5] 2xl:px-8">
      <div className="ml-4 flex h-16 items-center md:ml-0">
        <HamburgerIcon />
        <Link href="/">
          <Logo />
        </Link>
        <NavigationItems className="ml-8 hidden items-center gap-10 md:flex" />
      </div>
      <div className={`mr-4 flex items-center text-sm`}>
        <Can hideFromUser>
          <button
            onClick={onHandleLoginClick}
            className="mr-4 hidden rounded-lg py-[6px] px-[12px] text-base font-bold text-primary md:block"
          >
            {labels.login}
          </button>
        </Can>
        <Can hideFromUser>
          <button
            onClick={onHandleSignUpClick}
            className="rounded-md bg-buttonPrimary py-[8px] px-[24px] text-base font-medium text-white"
          >
            {labels.signUp}
          </button>
        </Can>
        {!isEmpty(user?.profilePicture) && (
          <Can hideFromGuest>
            <button className="relative mr-7 hidden h-11 w-11 overflow-hidden rounded-full md:block">
              <Image
                src={user?.profilePicture ?? ''}
                alt={'Profile picture'}
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
            </button>
          </Can>
        )}
        <Link className="sm:block md:hidden" href="/search">
          <MagnifyingGlassIcon className="ml-4 h-6 w-6 text-primary" />
        </Link>
      </div>
    </div>
  )
}
