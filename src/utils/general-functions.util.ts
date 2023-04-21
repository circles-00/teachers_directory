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
