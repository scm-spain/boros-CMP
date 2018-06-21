import VendorConsents from './VendorConsents'

export default class VendorConsentsFactory {
  constructor({gdprApplies, storeConsentGlobally}) {
    this._gdprApplies = gdprApplies
    this._storeConsentGlobally = storeConsentGlobally
  }
  createVendorConsents({consent, globalVendorList, allowedVendorIds} = {}) {
    return Promise.resolve().then(() =>
      Promise.all([
        Promise.resolve(
          allowedVendorIds || globalVendorList.vendors.map(v => v.id)
        ).then(vendorIds => {
          let vendorConsents = {}
          vendorIds.forEach(id => {
            vendorConsents.id = consent.isVendorAllowed(id)
          })
          return vendorConsents
        }),
        Promise.resolve(globalVendorList.purposes.map(p => p.id)).then(
          purposeIds => {
            let purposeConsents = {}
            purposeIds.forEach(id => {
              purposeConsents.id = consent.isPurposeAllowed(id)
            })
            return purposeConsents
          }
        )
      ]).then(
        ([vendorConsents, purposeConsents]) =>
          new VendorConsents({
            gdrpApplies: this._gdprApplies,
            hasGlobalScope: this._storeConsentGlobally,
            metadata: consent.getMetadataString(),
            vendorConsents,
            purposeConsents
          })
      )
    )
  }
}
