import { type FC, useMemo } from 'react'
import { generateRandomHexColor } from '@utils'

interface ISingleMessageProps {
  contactName: string
  title: string
  date: string
  status: string
  index: number
  totalMessages: number
}

function SingleLetterAvatar({
  contactName,
  status,
}: Pick<ISingleMessageProps, 'contactName' | 'status'>) {
  const avatarColor = useMemo(() => generateRandomHexColor(), [])

  const [firstLetter] = contactName.split(' ')
  return (
    <div
      style={{
        backgroundColor: avatarColor,
      }}
      className="relative flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold text-white"
    >
      {status === 'online' && (
        <div className="absolute right-[-4px] top-[-5px] h-3 w-3 rounded-full border-[1px] border-white bg-green-500" />
      )}
      <p>{firstLetter?.[0]}</p>
    </div>
  )
}

export const SingleMessage: FC<ISingleMessageProps> = ({
  contactName,
  status,
  date,
  title,
  index,
  totalMessages,
}) => {
  const isIndexEven = useMemo(() => index % 2 === 0, [index])

  const indexBasedTextColor = useMemo(
    () => (!isIndexEven ? 'text-[#637381]' : 'font-bold'),
    [isIndexEven]
  )

  return (
    <div>
      <div
        className={`flex flex-col p-7 ${!isIndexEven ? 'bg-[#F4F6F8]' : ''}`}
      >
        <div className="flex gap-4">
          <SingleLetterAvatar contactName={contactName} status={status} />
          <div className="flex flex-col gap-2">
            <p className={`text-sm ${indexBasedTextColor}`}>{contactName}</p>
            <p className={`text-sm ${indexBasedTextColor}`}>{title}</p>
            <p
              className={`text-xs ${
                !isIndexEven ? 'text-[#212B36]' : 'text-[#637381]'
              }`}
            >
              {date}
            </p>
          </div>
        </div>
      </div>
      {index !== totalMessages - 1 && <hr className="w-full fill-[#919EAB]" />}
    </div>
  )
}
