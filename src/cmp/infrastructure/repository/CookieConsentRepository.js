/**
 * @class
 * @implements ConsentRepository
 */
import {
  VENDOR_CONSENT_COOKIE_DEFAULT_PATH,
  VENDOR_CONSENT_COOKIE_MAX_AGE,
  VENDOR_CONSENT_COOKIE_NAME
} from '../configuration/cookie'

export default class CookieConsentRepository {
  constructor({cookieHandler, consentFactory}) {
    this._cookieHandler = cookieHandler
    this._consentFactory = consentFactory
    this._cookieName = VENDOR_CONSENT_COOKIE_NAME
    this._maxAgeSeconds = VENDOR_CONSENT_COOKIE_MAX_AGE
    this._path = VENDOR_CONSENT_COOKIE_DEFAULT_PATH
  }

  /**
   *
   * @returns {Promise<ConsentString | undefined>}
   */
  getConsent() {
    return Promise.resolve()
      .then(() => this._readCookie())
      .then(
        encodedConsent =>
          (encodedConsent && this._createConsent({encodedConsent})) || undefined
      )
  }

  saveConsent({consent}) {
    return Promise.resolve()
      .then(() => consent.getConsentString())
      .then(encodedConsent => this._writeCookie({value: encodedConsent}))
  }

  _readCookie() {
    return this._cookieHandler.read({cookieName: this._cookieName})
  }

  _writeCookie({value}) {
    return this._cookieHandler
      .write({
        cookieName: this._cookieName,
        maxAgeSeconds: this._maxAgeSeconds,
        path: this._path,
        value
      })
      .then(() => true)
  }

  _createConsent({encodedConsent}) {
    return this._consentFactory.createConsent({encodedConsent})
  }
}
