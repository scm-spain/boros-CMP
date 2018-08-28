import DomainEventBus from '../event_bus/DomainEventBus'
import {ConsentString} from 'consent-string'
import {globalVendorListVersionChanged} from './globalVendorListVersionChanged'

export default class ConsentFactory {
  constructor({allowedVendorIds} = {}) {
    this._allowedVendorIds = allowedVendorIds
  }

  createConsent({encodedConsent, globalVendorList}) {
    return Promise.resolve()
      .then(() => new ConsentString(encodedConsent))
      .then(consent =>
        this._checkConsentGlobalVendorsListVersion({
          consent,
          globalVendorList
        })
      )
      .then(consent => {
        consent.setGlobalVendorList(globalVendorList)
        return consent
      })
  }

  _checkConsentGlobalVendorsListVersion({consent, globalVendorList}) {
    return Promise.resolve().then(() => {
      if (
        consent.vendorListVersion &&
        consent.vendorListVersion > 0 &&
        consent.vendorListVersion !== globalVendorList.vendorListVersion
      ) {
        DomainEventBus.raise({
          domainEvent: globalVendorListVersionChanged({
            purposeConsents: consent.allowedPurposeIds,
            vendorConsents: consent.allowedVendorIds,
            oldVendorListVersion: consent.vendorListVersion,
            newGlobalVendorList: globalVendorList,
            allowedVendorIds: this._allowedVendorIds
          })
        })
      }
      return consent
    })
  }
}
