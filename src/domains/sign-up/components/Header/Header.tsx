import { type FC } from 'react'

interface IHeaderProps {
  title: string
  description: string
}

export const Header: FC<IHeaderProps> = ({ title, description }) => {
  return (
    <div>
      <h1 className="my-2 text-2xl font-bold text-primary">{title}</h1>
      <p className="whitespace-pre-wrap">{description}</p>
    </div>
  )
}
