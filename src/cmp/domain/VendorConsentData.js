export default class VendorConsentData {
  /**
   * Creates a VendorConsentData
   *
   * @param {String} consentData
   * @param {Boolean} gdprApplies
   * @param {Boolean} hasGlobalScope
   */
  constructor({consentData, gdprApplies, hasGlobalScope}) {
    this._consentData = consentData
    this._gdprApplies = gdprApplies
    this._hasGlobalScope = hasGlobalScope
  }

  get consentData() {
    return this._consentData
  }

  get gdprApplies() {
    return this._gdprApplies
  }

  get hasGlobalScope() {
    return this._hasGlobalScope
  }
}
