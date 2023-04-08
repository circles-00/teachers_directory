import { type NextPage } from 'next'
import { InitialEmailForm, CodeConfirmation } from '../domains/auth'
import { useState } from 'react'

const ForgotPassword: NextPage = () => {
  const [isCodeConfirmation, setIsCodeConfirmation] = useState(false)

  return isCodeConfirmation ? (
    <CodeConfirmation />
  ) : (
    <InitialEmailForm setIsCodeConfirmation={setIsCodeConfirmation} />
  )
}

export default ForgotPassword
