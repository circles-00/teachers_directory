import { type FC, type ReactElement } from 'react'
import { useUser } from '~/hooks/useAuth'

interface ICanProps {
  children: ReactElement
  hideFromUser?: boolean
}

export const Can: FC<ICanProps> = ({ children, hideFromUser = false }) => {
  const { user, status } = useUser()

  if (status === 'loading') return null

  if (hideFromUser && user) {
    return null
  }

  return children
}
