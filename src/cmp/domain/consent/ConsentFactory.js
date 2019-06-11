import DomainEventBus from '../event_bus/DomainEventBus'
import {ConsentString} from 'consent-string'
import {globalVendorListVersionChanged} from './globalVendorListVersionChanged'

export default class ConsentFactory {
  constructor({allowedVendorIds, vendorListRepository} = {}) {
    this._allowedVendorIds = allowedVendorIds
    this._vendorListRepository = vendorListRepository
  }

  /**
   * Decodes a base-64 consent string.
   * If the decoded consent has a vendorListVersion that differs from the current global vendor list version,
   * it will dispatch a GLOBAL_VENDOR_LIST_VERSION_CHANGED event.
   * @param encodedConsent {string}
   * @return {Promise.<ConsentString>}
   */
  createConsent({encodedConsent}) {
    return Promise.resolve()
      .then(() => new ConsentString(encodedConsent))
      .then(consent => Promise.all([consent, this._getGlobalVendorList()]))
      .then(([consent, newGlobalVendorList]) =>
        this._checkConsentGlobalVendorsListVersion({
          consent,
          newGlobalVendorList
        }).then(({consent, oldGlobalVendorList}) => {
          consent.setGlobalVendorList(
            oldGlobalVendorList || newGlobalVendorList
          )
          return consent
        })
      )
  }

  _getGlobalVendorList({vendorListVersion} = {}) {
    return this._vendorListRepository.getGlobalVendorList({vendorListVersion})
  }

  _checkConsentGlobalVendorsListVersion({consent, newGlobalVendorList}) {
    return Promise.resolve().then(() => {
      if (newGlobalVendorList.vendorListVersion !== consent.vendorListVersion) {
        return this._getGlobalVendorList({
          vendorListVersion: consent.vendorListVersion
        }).then(oldGlobalVendorList => {
          DomainEventBus.raise({
            domainEvent: globalVendorListVersionChanged({
              purposeConsents: consent.allowedPurposeIds,
              vendorConsents: consent.allowedVendorIds,
              newGlobalVendorList,
              oldGlobalVendorList,
              allowedVendorIds: this._allowedVendorIds
            })
          })
          return {consent, oldGlobalVendorList}
        })
      }
      return {consent}
    })
  }
}
