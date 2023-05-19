import { AccountTypeContainer } from "@domains/sign-up";
import Link from "next/link";
import { type TUserRole } from "@shared";
import { type TeachersDirectoryPage } from "~/types/page";
import { EScreenId } from "@domains/screen";

type AccountType = {
  title: string
  description: string
  accountType: TUserRole
}

const accountTypes: AccountType[] = [
  {
    title: 'Teacher/Support staff',
    description: 'A teaching qualification or a\ndegree is required',
    accountType: 'TEACHER',
  },
  {
    title: 'School/Organisation',
    description: 'A valid school/organisation email\naddress is required',
    accountType: 'SCHOOL',
  },
  {
    title: 'General User',
    description: `A general user that is neither a qualified \nteacher, nor a school/organisation`,
    accountType: 'GENERAL',
  },
]

const AccountType: TeachersDirectoryPage = () => {
  return (
    <div className="my-36 mx-4 flex justify-center md:mx-0">
      <div className="flex flex-col">
        <h1 className="mb-4 text-center text-3xl font-bold text-primary">
          Are you looking to register as
        </h1>
        <div className="flex flex-col gap-2 xl:flex-row">
          {accountTypes.map(({ title, description, accountType }, idx) => (
            <AccountTypeContainer
              key={idx}
              title={title}
              description={description}
              accountType={accountType}
            />
          ))}
        </div>
        <p className="mt-6 text-center text-sm">
          Not a school or a teacher? Register{' '}
          <Link className="font-bold text-primary" href="#">
            here
          </Link>
        </p>
      </div>
    </div>
  )
}

AccountType.pageType = 'PUBLIC'
AccountType.screenId = EScreenId.SIGN_UP_ACCOUNT_TYPE

export default AccountType
