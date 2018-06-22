/**
 * @class
 * @implements ConsentRepository
 */
export default class CookieConsentRepository {
  constructor({dom}) {
    this._dom = dom
  }

  getConsentData() {
    return Promise.resolve().then(() =>
      this._readCookie({cookieName: VENDOR_CONSENT_COOKIE_NAME})
    )
  }

  setConsentData({consentData}) {
    return Promise.resolve()
      .then(() => {
        this._writeCookie({
          cookieName: VENDOR_CONSENT_COOKIE_NAME,
          consentData
        })
      })
      .then(() => {
        return null
      })
      .catch(e => {})
  }

  _readCookie({cookieName}) {
    return Promise.resolve()
      .then(() => `; ${this._dom.cookie}`.split(`; ${cookieName}=`))
      .then(
        cookieParts =>
          (cookieParts.length === 2 &&
            cookieParts
              .pop()
              .split(';')
              .shift()) ||
          undefined
      )
  }

  _writeCookie({cookieName, consentData}) {}
}
const VENDOR_CONSENT_COOKIE_NAME = 'euconsent'
