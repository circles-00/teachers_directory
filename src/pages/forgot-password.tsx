import { InitialEmailForm, CodeConfirmation } from '@domains/auth'
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

ForgotPassword.pageType = 'PUBLIC'

export default ForgotPassword
