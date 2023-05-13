import { readFile } from 'fs/promises'
import { type NextApiRequest, type NextApiResponse } from 'next'
import { env } from '~/env.mjs'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  if (env.MAILER_ENV !== 'development')
    return res.status(403).send('Unauthorized')

  let file
  try {
    file = JSON.parse(await readFile('mails.json', 'utf-8')) as any[]
  } catch (error) {
    file = []
  }

  res.status(200).json(file)
}
