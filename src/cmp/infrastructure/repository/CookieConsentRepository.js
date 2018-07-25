/**
 * @class
 * @implements ConsentRepository
 */
export default class CookieConsentRepository {
  constructor({cookieHandler, consentFactory, vendorListRepository}) {
    this._readVendorCookie = readCookie({
      cookieHandler,
      cookieName: VENDOR_CONSENT_COOKIE_NAME
    })
    this._writeVendorCookie = writeCookie({
      cookieHandler,
      cookieName: VENDOR_CONSENT_COOKIE_NAME,
      maxAgeSeconds: VENDOR_CONSENT_COOKIE_MAX_AGE
    })
    this._createConsent = createConsent({consentFactory})
    this._getGlobalVendorList = getGlobalVendorList({vendorListRepository})
  }

  getConsent() {
    return Promise.resolve()
      .then(() =>
        Promise.all([this._readVendorCookie(), this._getGlobalVendorList()])
      )
      .then(
        ([encodedConsent, globalVendorList]) =>
          (encodedConsent &&
            this._createConsent({encodedConsent, globalVendorList})) ||
          undefined
      )
  }

  saveConsent({consent}) {
    return Promise.resolve()
      .then(() => consent.getConsentString())
      .then(encodedConsent => this._writeVendorCookie({value: encodedConsent}))
  }
}

const VENDOR_CONSENT_COOKIE_NAME = 'euconsent'
const VENDOR_CONSENT_COOKIE_MAX_AGE = 33696000

const readCookie = ({cookieHandler, cookieName}) => () =>
  cookieHandler.read({cookieName})

const writeCookie = ({
  cookieHandler,
  cookieName,
  maxAgeSeconds,
  path = '/'
} = {}) => ({value}) =>
  cookieHandler
    .write({
      cookieName,
      value,
      maxAgeSeconds,
      path
    })
    .then(() => true)

const getGlobalVendorList = ({vendorListRepository}) => () =>
  vendorListRepository.getGlobalVendorList()

const createConsent = ({consentFactory}) => ({
  encodedConsent,
  globalVendorList
}) => consentFactory.createConsent({encodedConsent, globalVendorList})
