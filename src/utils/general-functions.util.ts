export const generateArray = (length: number) => {
  return Array.from({ length }, (_, i) => i)
}

export const convertFileToBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)

    fileReader.onload = () => {
      resolve(fileReader.result as string)
    }

    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

export const getFileSizeInMB = (file: File) => {
  return (file.size / (1024 * 1024)).toFixed(2)
}

export const formatLongString = (str: string, maxLength: number) => {
  return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str
}

export const isClient = () => typeof window !== 'undefined'
