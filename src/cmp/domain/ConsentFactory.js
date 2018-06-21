import {ConsentString} from 'consent-string'

export default class ConsentFactory {
  createConsent({consentString, globalVendorList}) {
    return Promise.resolve()
      .then(() => new ConsentString(consentString))
      .then(consent => {
        consent.setGlobalVendorList(globalVendorList)
        return consent
      })
  }
}
