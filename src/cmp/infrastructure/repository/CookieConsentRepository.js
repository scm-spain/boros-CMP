/**
 * @class
 * @implements ConsentRepository
 */
export default class CookieConsentRepository {
  constructor({dom, consentFactory, vendorListRepository}) {
    this._readVendorCookie = readCookie({
      dom,
      cookieName: VENDOR_CONSENT_COOKIE_NAME
    })
    this._writeVendorCookie = writeCookie({
      dom,
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

const readCookie = ({dom, cookieName}) => () =>
  Promise.resolve(`; ${dom.cookie}`.split(`; ${cookieName}=`)).then(
    cookieParts =>
      (cookieParts.length === 2 &&
        cookieParts
          .pop()
          .split(';')
          .shift()) ||
      undefined
  )

const writeCookie = ({dom, cookieName, maxAgeSeconds, path = '/'} = {}) => ({
  value
}) =>
  Promise.resolve(maxAgeSeconds ? `;max-age=${maxAgeSeconds}` : '')
    .then(maxAge => `${cookieName}=${value};path=${path}${maxAge}`)
    .then(cookieValue => (document.cookie = cookieValue))

const getGlobalVendorList = ({vendorListRepository}) => () =>
  vendorListRepository.getGlobalVendorList()

const createConsent = ({consentFactory}) => ({
  encodedConsent,
  globalVendorList
}) => consentFactory.createConsent({encodedConsent, globalVendorList})
