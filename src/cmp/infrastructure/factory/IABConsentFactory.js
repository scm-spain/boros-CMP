import {ConsentString} from 'consent-string'

/**
 * @class
 * @implements ConsentFactory
 */
export default class IABConsentFactory {
  createConsent({encodedConsent, globalVendorList}) {
    return Promise.resolve()
      .then(() => new ConsentString(encodedConsent))
      .then(consent => {
        consent.setGlobalVendorList(globalVendorList)
        return consent
      })
  }
}
