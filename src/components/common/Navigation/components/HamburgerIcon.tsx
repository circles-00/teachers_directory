import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useEffect, type FC } from 'react'
import { useCommonActions, useCommonState } from '@hooks'

interface IHamburgerIconProps {}

export const HamburgerIcon: FC<IHamburgerIconProps> = () => {
  const router = useRouter()

  const { isMobileDrawerOpen } = useCommonState()
  const { setIsMobileDrawerOpen } = useCommonActions()

  // Close mobile drawer when route changes
  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      if (isMobileDrawerOpen) {
        setIsMobileDrawerOpen(false)
      }
    })
  }, [router, isMobileDrawerOpen, setIsMobileDrawerOpen])

  return (
    <div className="mt-2">
      {/* DaisyUI */}
      <label className="swap swap-rotate mr-3 sm:visible md:invisible">
        <input
          id="drawer"
          type="checkbox"
          checked={isMobileDrawerOpen}
          onChange={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
        />

        <Bars3Icon className="swap-off h-8" />
        <XMarkIcon className="swap-on h-8" />
      </label>
    </div>
  )
}
