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
}

const VENDOR_CONSENT_COOKIE_NAME = 'euconsent'

const readCookie = ({dom, cookieName}) => () =>
  Promise.resolve()
    .then(() => `; ${dom.cookie}`.split(`; ${cookieName}=`))
    .then(
      cookieParts =>
        (cookieParts.length === 2 &&
          cookieParts
            .pop()
            .split(';')
            .shift()) ||
        undefined
    )

const getGlobalVendorList = ({vendorListRepository}) => () =>
  Promise.resolve().then(() => vendorListRepository.getGlobalVendorList())

const createConsent = ({consentFactory}) => ({
  encodedConsent,
  globalVendorList
}) =>
  Promise.resolve().then(() =>
    consentFactory.createConsent({encodedConsent, globalVendorList})
  )
