import { CodeConfirmation, InitialEmailForm } from "@domains/auth";
import { useState } from "react";
import { type TeachersDirectoryPage } from "~/types/page";
import { EScreenId } from "@domains/screen";

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
ForgotPassword.screenId = EScreenId.FORGOT_PASSWORD

export default ForgotPassword
