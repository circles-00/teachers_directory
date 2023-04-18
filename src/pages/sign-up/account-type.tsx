import { AccountTypeContainer } from '@domains/sign-up'
import Link from 'next/link'

const accountTypes = [
  {
    title: 'Teacher/Support staff',
    description: 'A teaching qualification or a\ndegree is required',
    href: '/sign-up/teachers',
  },
  {
    title: 'School/Organisation',
    description: 'A valid school/organisation email\naddress is required',
    href: '/sign-up/schools',
  },
]

const AccountType = () => {
  return (
    <div className="my-36 mx-4 flex justify-center md:mx-0">
      <div className="flex flex-col">
        <h1 className="mb-4 text-center text-3xl font-bold text-primary">
          Are you looking to register as
        </h1>
        {accountTypes.map(({ title, description, href }, idx) => (
          <AccountTypeContainer
            key={idx}
            title={title}
            description={description}
            href={href}
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
