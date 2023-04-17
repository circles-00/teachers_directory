import { AccountTypeContainer } from '@domains/sign-up'
import Link from 'next/link'

const accountTypes = [
  {
    title: 'Teacher/Support staff',
    description: 'A teaching qualification or a\ndegree is required',
  },
  {
    title: 'School/Organisation',
    description: 'A valid school/organisation email\naddress is required',
  },
]

const AccountType = () => {
  return (
    <div className="my-36 mx-4 flex justify-center md:mx-0">
      <div className="flex flex-col">
        <h1 className="mb-4 text-center text-3xl font-bold text-primary">
          Are you looking to register as
        </h1>
        {accountTypes.map(({ title, description }, idx) => (
          <AccountTypeContainer
            key={idx}
            title={title}
            description={description}
          />
        ))}
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
