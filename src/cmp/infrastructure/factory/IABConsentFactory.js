import {ConsentString} from 'consent-string'

/**
 * @class
 * @implements ConsentFactory
 */
export default class IABConsentFactory {
  createConsent({consentString, globalVendorList}) {
    return Promise.resolve()
      .then(() => new ConsentString(consentString))
      .then(consent => {
        consent.setGlobalVendorList(globalVendorList)
        return consent
      })
  }
}
