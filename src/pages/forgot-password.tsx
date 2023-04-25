import { type NextPage } from 'next'
import { InitialEmailForm, CodeConfirmation } from '@domains/auth'
import { useState } from 'react'

const ForgotPassword: NextPage = () => {
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
