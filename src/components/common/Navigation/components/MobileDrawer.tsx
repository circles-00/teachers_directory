import { type FC } from 'react'
import { NavigationItems } from './NavigationItems'

interface IMobileDrawerProps {}

export const MobileDrawer: FC<IMobileDrawerProps> = () => {
  return (
    <div className="drawer-side flex h-screen flex-col items-start">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>

      <NavigationItems className="menu mb-4 w-full border-b-[1px] bg-base-100 p-4 text-base-content" />

      <button className="mx-auto w-80 rounded-lg border-[1px] border-primaryTransparent-28 py-[6px] px-[16px] text-primary md:block">
        <b>Login</b>
      </button>
    </div>
  )
}
