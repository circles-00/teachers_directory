import { type FC, useEffect } from 'react'

interface IHeaderProps {
  title: string
  description: string
}

export const Header: FC<IHeaderProps> = ({ title, description }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div>
      <h1 className="mt-2 text-2xl font-bold text-primary">{title}</h1>
      <p className="mt-4 whitespace-pre-wrap">{description}</p>
    </div>
  )
}
