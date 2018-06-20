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
}
const VENDOR_CONSENT_COOKIE_NAME = 'euconsent'
