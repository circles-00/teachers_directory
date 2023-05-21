import { CodeConfirmation, InitialEmailForm } from '@domains/auth'
import { useState } from 'react'
import { type TeachersDirectoryPage } from '~/types/page'

const ForgotPassword: TeachersDirectoryPage = () => {
  const [isCodeConfirmation, setIsCodeConfirmation] = useState(false)

  return isCodeConfirmation ? (
    <CodeConfirmation
      onSubmit={() => {
        console.log()
      }}
      isForgotPassword
    />
  ) : (
    <InitialEmailForm setIsCodeConfirmation={setIsCodeConfirmation} />
  )
}

export default ForgotPassword
