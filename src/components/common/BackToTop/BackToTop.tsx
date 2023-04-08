import { useEffect, useState, type FC } from 'react'

interface IBackToTopProps {}

export const BackToTop: FC<IBackToTopProps> = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    window.onscroll = () => {
      setShow(
        document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
      )
    }
  }, [])

  const scrollBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return show ? (
    <button
      onClick={scrollBackToTop}
      x-data="topBtn"
      id="topButton"
      className="fixed bottom-10 right-10 z-10 animate-bounce rounded-full bg-gray-100 p-3 shadow-md"
    >
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="#00AB55"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          strokeWidth="2.5"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  ) : (
    <></>
  )
}
