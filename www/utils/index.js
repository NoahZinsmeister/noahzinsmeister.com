import nextCookies from 'next-cookies'
import Cookies from 'js-cookie'

import { COOKIE_NAME } from '../contexts/Cookie'

export function formatCookie(o) {
  const stringified = JSON.stringify(o || {})
  const asBase64 = Buffer.from(stringified).toString('base64')
  return asBase64
}

function parseCookie(s) {
  const stringified = Buffer.from(s || '', 'base64').toString()
  const asObject = JSON.parse(stringified || JSON.stringify({}))
  return asObject
}

function getCookieServer(context) {
  return nextCookies(context)[COOKIE_NAME]
}

function getCookieClient() {
  return Cookies.get(COOKIE_NAME)
}

export function getCookie(context) {
  return parseCookie(context ? getCookieServer(context) : getCookieClient())
}
