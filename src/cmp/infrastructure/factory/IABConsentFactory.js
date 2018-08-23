import DomainEventBus from '../../domain/event_bus/DomainEventBus'
import {ConsentString} from 'consent-string'
import {obsoleteVendorsListVersion} from '../../domain/consent/obsoleteVendorsListVersion'

/**
 * @class
 * @implements ConsentFactory
 */
export default class IABConsentFactory {
  constructor({allowedVendorIds}) {
    this._checkConsentGlobalVendorsListVersion = checkConsentGlobalVendorsListVersion(
      {allowedVendorIds}
    )
  }
  createConsent({encodedConsent, globalVendorList}) {
    return Promise.resolve()
      .then(() => new ConsentString(encodedConsent))
      .then(consent =>
        this._checkConsentGlobalVendorsListVersion({consent, globalVendorList})
      )
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
          consentData: consent.getConsentString(),
          globalVendorList: globalVendorList,
          allowedVendorIds: allowedVendorIds
        })
      })
    }
    return consent
  })
