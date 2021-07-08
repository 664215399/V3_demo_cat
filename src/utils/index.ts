export function CountryCodeConvert (code:string) {
  return `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/4x3/${code.toLowerCase()}.svg`
}

export function StringConvertArray (str: string, symbol:string) {
  return str === '' ? [] : str.split(symbol)
}
export function getToken () {
  return localStorage.getItem('token')
}
