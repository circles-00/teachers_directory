import { type FC, Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

interface ISkipButtonProps {
  onClick: () => void
}

export const SkipButton: FC<ISkipButtonProps> = ({ onClick }) => {
  const router = useRouter()

  return (
    <div className="button-white mr-auto mt-4 flex w-full cursor-pointer items-center justify-between rounded-md border-[1px] border-primaryTransparent-48 pl-3 font-bold text-primary hover:bg-[#F2F7F2] md:mr-0 md:w-52">
      <button type="button" className="min-h-12 mx-auto" onClick={onClick}>
        Skip this step
      </button>
      <Popover className="relative h-full">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                flex h-full w-8 items-center justify-center`}
            >
              <div className="h-full w-px bg-primary" />
              <ChevronDownIcon className="mx-auto h-5 w-5 fill-primary" />
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
              <Popover.Panel className="absolute z-10 mt-3 w-60 max-w-sm -translate-x-1/2 transform sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="bg-gray-50 p-4">
                    <button
                      type="button"
                      onClick={() => router.push('/teachers/dashboard')}
                      className="flow-root w-full rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <span className="flex items-center">
                        <span className="text-xs font-medium text-gray-900">
                          Skip the registration process
                        </span>
                      </span>
                      <span className="mt-1 block text-[10px] text-gray-500">
                        You can complete it later
                      </span>
                    </button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
