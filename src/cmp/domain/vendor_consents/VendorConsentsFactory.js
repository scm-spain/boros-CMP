import VendorConsents from './VendorConsents'
import {isWhitelisted} from './whitelistFilter'

export default class VendorConsentsFactory {
  constructor({gdprApplies = true, storeConsentGlobally = false} = {}) {
    this._gdprApplies = gdprApplies
    this._storeConsentGlobally = storeConsentGlobally
  }
  createVendorConsents({consent, globalVendorList, allowedVendorIds} = {}) {
    return Promise.resolve().then(() =>
      Promise.all([
        filterAllowedVendorIdsFromGlobalList({
          globalVendorList,
          allowedVendorIds
        }).then(filteredVendorIds =>
          createVendorConsents({consent, vendorIds: filteredVendorIds})
        ),
        createPurposeConsents({consent, globalVendorList})
      ]).then(
        ([vendorConsents, purposeConsents]) =>
          new VendorConsents({
            gdprApplies: this._gdprApplies,
            hasGlobalScope: this._storeConsentGlobally,
            metadata: consent.getMetadataString(),
            vendorConsents,
            purposeConsents
          })
      )
    )
  }
}

const filterAllowedVendorIdsFromGlobalList = ({
  globalVendorList,
  allowedVendorIds
}) =>
  Promise.resolve().then(() =>
    globalVendorList.vendors.map(v => v.id).filter(id =>
      isWhitelisted({
        whitelist: allowedVendorIds,
        id
      })
    )
  )

const createVendorConsents = ({consent, vendorIds = []} = {}) =>
  Promise.resolve().then(() =>
    vendorIds.reduce(
      (accumulator, id) => ({
        ...accumulator,
        [`${id}`]: consent.isVendorAllowed(id)
      }),
      {}
    )
  )

const createPurposeConsents = ({consent, globalVendorList}) =>
  Promise.resolve().then(() =>
    globalVendorList.purposes.map(p => p.id).reduce(
      (accumulator, id) => ({
        ...accumulator,
        [`${id}`]: consent.isPurposeAllowed(id)
      }),
      {}
    )
  )
