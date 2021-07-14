
export function CountryCodeConvert (code:string) {
  return `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/4x3/${code.toLowerCase()}.svg`
}

export function StringConvertArray (str: string, symbol:string) {
  return str === '' ? [] : str.split(symbol)
}
export function getToken () {
  return localStorage.getItem('token')
}

export interface CheckCondition {
  format?: string[]
  size?:number
}
type ErrorTyype='size'|'format'|null
export function beforeUploadCheck (file:File, condition:CheckCondition) {
  const { format, size } = condition
  const isValidFormat = format ? format.includes(file.type) : true
  const isValidSize = size ? (file.size / 1024 / 1024 < size) : true
  let error: ErrorTyype = null
  if (!isValidFormat) {
    error = 'format'
  }
  if (!isValidSize) {
    error = 'size'
  }
  return {
    passed: isValidFormat && isValidSize,
    error
  }
}

export function uuid () {
  function S4 () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}
