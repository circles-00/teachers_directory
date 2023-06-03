import { type FC, type ReactElement } from 'react'
import { useUser } from '~/hooks/useAuth'

interface ICanProps {
  children: ReactElement
  hideFromUser?: boolean
  hideFromGuest?: boolean
}

export const Can: FC<ICanProps> = ({
  children,
  hideFromUser = false,
  hideFromGuest = false,
}) => {
  const { user, status } = useUser()

  if (status === 'loading') return null

  if (hideFromUser && user) {
    return null
  }

  if (hideFromGuest && !user) {
    return null
  }

  return children
}
