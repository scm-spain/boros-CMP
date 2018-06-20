/**
 * @class
 * @implements ConsentRepository
 */
export default class CookieConsentRepository {
  constructor({dom}) {
    this._dom = dom
  }

  getConsentData() {
    return Promise.resolve().then(() => {
      const cookie = this._readCookie(VENDOR_CONSENT_COOKIE_NAME)
      return cookie
    })
  }

  _readCookie(name) {
    const value = `; ${this._dom.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      return parts
        .pop()
        .split(';')
        .shift()
    }
  }
}
const VENDOR_CONSENT_COOKIE_NAME = 'euconsent'
