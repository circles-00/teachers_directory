import { FC, Fragment, useRef } from 'react'
import InfoIcon from '@assets/info-64.png'
import Image from 'next/image'
import { Popover, Transition } from '@headlessui/react'

interface IInfoBoxProps {
  content: string
}

export const InfoBox: FC<IInfoBoxProps> = ({ content }) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const timeoutDuration = 200
  const closePopover = () => {
    return buttonRef.current?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      })
    )
  }
  let timeout = setTimeout(() => closePopover(), timeoutDuration)

  const onMouseEnter = (open: boolean) => {
    clearTimeout(timeout)

    if (open) return
    return buttonRef.current?.click()
  }

  const onMouseLeave = (open: boolean) => {
    if (!open) return
    timeout = setTimeout(() => closePopover(), timeoutDuration)
  }

  return (
    <div className="flex items-center">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              ref={buttonRef}
              onMouseEnter={onMouseEnter.bind(null, open)}
              onMouseLeave={onMouseLeave.bind(null, open)}
              className="flex w-full items-center gap-2 rounded-lg focus:outline-0"
            >
              <Image src={InfoIcon.src} alt="Info Box" width={20} height={20} />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="w- absolute top-[-50px] left-6 right-0 z-10 m-auto w-64 rounded-md bg-white p-4 shadow-md">
                <p>{content}</p>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
