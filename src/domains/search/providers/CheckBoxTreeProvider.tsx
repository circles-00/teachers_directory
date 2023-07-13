import { type ReactNode, type FC, createContext, useContext } from 'react'
import { type useTreeSelect } from 'react-tree-select-hook'

type TCheckBoxTreeContext = ReturnType<typeof useTreeSelect>

interface ICheckBoxTreeProviderProps {
  children: ReactNode
  data: TCheckBoxTreeContext
}

const CheckBoxTreeContext = createContext<TCheckBoxTreeContext | null>(null)

export const useCheckBoxTreeContext = () => {
  const context = useContext(CheckBoxTreeContext)

  if (!context) {
    throw new Error(
      'useCheckBoxTreeContext must be used within a CheckBoxTreeProvider'
    )
  }

  return context
}

export const CheckBoxTreeProvider: FC<ICheckBoxTreeProviderProps> = ({
  children,
  data,
}) => {
  return (
    <CheckBoxTreeContext.Provider value={data}>
      {children}
    </CheckBoxTreeContext.Provider>
  )
}
