/**
 * @class
 * @implements VendorConsentsRepository
 */
export default class CookieVendorConsentsRepository {
  constructor({dom, vendorConsentsFactory, vendorListRepository}) {
    this._readVendorCookie = readCookie({
      dom,
      cookieName: VENDOR_CONSENT_COOKIE_NAME
    })
    this._createVendorConsentsFromCookieValue = createVendorConsentsFromCookieValue(
      {vendorConsentsFactory}
    )
    this._getGlobalVendorList = getGlobalVendorList({vendorListRepository})
  }

  getVendorConsents({allowedVendorIds} = {}) {
    return Promise.resolve()
      .then(() =>
        Promise.all([this._readVendorCookie(), this._getGlobalVendorList()])
      )
      .then(
        ([cookieValue, globalVendorList]) =>
          (cookieValue &&
            this._createVendorConsentsFromCookieValue({
              cookieValue,
              globalVendorList,
              allowedVendorIds
            })) ||
          undefined
      )
  }

  saveVendorConsents() {
    throw new Error('Not ready')
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

const createVendorConsentsFromCookieValue = ({vendorConsentsFactory}) => ({
  cookieValue,
  globalVendorList,
  allowedVendorIds
}) =>
  Promise.resolve().then(() =>
    vendorConsentsFactory.createFromEncodedConsent({
      encodedConsent: cookieValue,
      globalVendorList,
      allowedVendorIds
    })
  )

const getGlobalVendorList = ({vendorListRepository}) => () =>
  Promise.resolve().then(() => vendorListRepository.getGlobalVendorList())
