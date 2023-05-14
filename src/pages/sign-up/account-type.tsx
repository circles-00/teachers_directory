import { AccountTypeContainer } from '@domains/sign-up'
import Link from 'next/link'
import { type TSignupAccountType } from '@store'

type AccountType = {
  title: string
  description: string
  href: string // TODO: Maybe remove this prop, since everywhere is the same
  accountType: TSignupAccountType
}

const accountTypes: AccountType[] = [
  {
    title: 'Teacher/Support staff',
    description: 'A teaching qualification or a\ndegree is required',
    href: '/sign-up',
    accountType: 'teacher',
  },
  {
    title: 'School/Organisation',
    description: 'A valid school/organisation email\naddress is required',
    href: '/sign-up',
    accountType: 'school',
  },
  {
    title: 'General User',
    description: `A general user that is neither a qualified \nteacher, nor a school/organisation`,
    href: '/sign-up',
    accountType: 'general',
  },
]

const AccountType = () => {
  return (
    <div className="my-36 mx-4 flex justify-center md:mx-0">
      <div className="flex flex-col">
        <h1 className="mb-4 text-center text-3xl font-bold text-primary">
          Are you looking to register as
        </h1>
        <div className="flex flex-col gap-2 xl:flex-row">
          {accountTypes.map(
            ({ title, description, href, accountType }, idx) => (
              <AccountTypeContainer
                key={idx}
                title={title}
                description={description}
                accountType={accountType}
                href={href}
              />
            )
          )}
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

export default AccountType
