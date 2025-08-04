export function getCookie(cookiename: string): string {
  const cookiestring = RegExp(cookiename + '=[^;]+').exec(document.cookie)
  return decodeURIComponent(cookiestring ? cookiestring.toString().replace(/^[^=]+./, '') : '')
}