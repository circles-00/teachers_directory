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

export const convertBase64ToFile = (dataurl: string, filename: string) => {
  const arr = dataurl.split(',')
  const mime = (arr[0]?.match(/:(.*?);/) ?? [])[1]
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const bstr = atob(arr[arr.length - 1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

export const getFileSizeInMB = (file: File) => {
  return (file.size / (1024 * 1024)).toFixed(2)
}

export const formatLongString = (str: string, maxLength: number) => {
  return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str
}

export const isClient = () => typeof window !== 'undefined'
