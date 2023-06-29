export const formatMonth = (month: number) => {
  return month < 10 ? `0${month}` : `${month}`
}

export const getMonthNameFromNumber = (monthNumber: number) => {
  const date = new Date()
  date.setMonth(monthNumber - 1)

  return date.toLocaleString('en-US', { month: 'long' })
}

export const getMonthNumberFromName = (monthName: string) => {
  return formatMonth(new Date(`${monthName} 1, 2022`).getMonth() + 1)
}

export const getDatePartsFromDateString = (date: string) => {
  const dateParts = date.split('/')

  return {
    day: dateParts[0] ?? '',
    month: dateParts[1] ?? '1',
    year: dateParts[2] ?? '',
  }
}

export const addDays = (date: Date, days: number) => {
  date.setDate(date.getDate() + days)
  return date
}
