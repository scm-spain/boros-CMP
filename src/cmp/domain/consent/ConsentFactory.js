import DomainEventBus from '../event_bus/DomainEventBus'
import {ConsentString} from 'consent-string'
import {obsoleteVendorsListVersion} from './obsoleteVendorsListVersion'

export default class ConsentFactory {
  constructor({allowedVendorIds} = {}) {
    this._checkConsentGlobalVendorsListVersion = checkConsentGlobalVendorsListVersion(
      {allowedVendorIds}
    )
  }
  createConsent({encodedConsent, globalVendorList}) {
    return Promise.resolve()
      .then(() => new ConsentString(encodedConsent))
      .then(consent => {
        this._checkConsentGlobalVendorsListVersion({consent, globalVendorList})
        return consent
      })
      .then(consent => {
        consent.setGlobalVendorList(globalVendorList)
        return consent
      })
  }
}

const checkConsentGlobalVendorsListVersion = ({allowedVendorIds}) => ({
  consent,
  globalVendorList
}) =>
  Promise.resolve().then(() => {
    if (
      consent.vendorListVersion &&
      consent.vendorListVersion > 0 &&
      consent.vendorListVersion !== globalVendorList.vendorListVersion
    ) {
      DomainEventBus.raise({
        domainEvent: obsoleteVendorsListVersion({
          purposeConsents: consent.allowedPurposeIds,
          vendorConsents: consent.allowedVendorIds,
          oldVendorListVersion: consent.vendorListVersion,
          newGlobalVendorList: globalVendorList,
          allowedVendorIds: allowedVendorIds
        })
      })
    }
    return consent
  })
