import DomainEventBus from '../event_bus/DomainEventBus'
import {ConsentString} from 'consent-string'
import {globalVendorListVersionChanged} from './globalVendorListVersionChanged'

export default class ConsentFactory {
  constructor({allowedVendorIds, vendorListRepository} = {}) {
    this._allowedVendorIds = allowedVendorIds
    this._vendorListRepository = vendorListRepository
  }

  createConsent({encodedConsent}) {
    return Promise.resolve()
      .then(() => new ConsentString(encodedConsent))
      .then(consent =>
        Promise.all([
          consent,
          this._getGlobalVendorList(),
          this._getGlobalVendorList({
            vendorListVersion: consent.vendorListVersion
          })
        ])
      )
      .then(([consent, newGlobalVendorList, oldGlobalVendorList]) =>
        this._checkConsentGlobalVendorsListVersion({
          consent,
          newGlobalVendorList,
          oldGlobalVendorList
        }).then(consent => {
          consent.setGlobalVendorList(oldGlobalVendorList)
          return consent
        })
      )
  }

  _getGlobalVendorList({vendorListVersion} = {}) {
    return this._vendorListRepository.getGlobalVendorList({vendorListVersion})
  }

  _checkConsentGlobalVendorsListVersion({
    consent,
    newGlobalVendorList,
    oldGlobalVendorList
  }) {
    return Promise.resolve().then(() => {
      if (
        newGlobalVendorList.vendorListVersion !==
        oldGlobalVendorList.oldGlobalVendorList
      ) {
        DomainEventBus.raise({
          domainEvent: globalVendorListVersionChanged({
            purposeConsents: consent.allowedPurposeIds,
            vendorConsents: consent.allowedVendorIds,
            newGlobalVendorList,
            oldGlobalVendorList,
            allowedVendorIds: this._allowedVendorIds
          })
        })
      }
      return consent
    })
  }
}
