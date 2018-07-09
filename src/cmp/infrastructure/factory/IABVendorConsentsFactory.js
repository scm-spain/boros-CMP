import VendorConsents from '../../domain/VendorConsents'

/**
 * @class
 * @implements VendorConsentsFactory
 */
export default class IABVendorConsentsFactory {
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
  Promise.resolve(
    (allowedVendorIds &&
      globalVendorList.vendors
        .map(v => v.id)
        .filter(id => allowedVendorIds.indexOf(id) !== -1)) ||
      globalVendorList.vendors.map(v => v.id)
  )

const createVendorConsents = ({consent, vendorIds = []} = {}) =>
  Promise.resolve().then(() => {
    let vendorConsents = {}
    vendorIds.forEach(id => {
      vendorConsents[id] = consent.isVendorAllowed(id)
    })
    return vendorConsents
  })

const createPurposeConsents = ({consent, globalVendorList}) =>
  Promise.resolve(globalVendorList.purposes.map(p => p.id)).then(purposeIds => {
    let purposeConsents = {}
    purposeIds.forEach(id => {
      purposeConsents[id] = consent.isPurposeAllowed(id)
    })
    return purposeConsents
  })
