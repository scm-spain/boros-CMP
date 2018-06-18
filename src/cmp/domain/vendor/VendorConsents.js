export default class VendorConsents {
  /**
   * Creates a VendorConsents
   *
   * @param {String} metadata : header data from the vendor consent format
   * @param {Boolean} gdprApplies
   * @param {Boolean} hasGlobalScope
   * @param {[Consent]} purposeConsents
   * @param {[Consent]} vendorConsents
   */
  constructor({
    metadata,
    gdprApplies,
    hasGlobalScope,
    purposeConsents,
    vendorConsents
  }) {
    this._metadata = metadata
    this._gdprApplies = gdprApplies
    this._hasGlobalScope = hasGlobalScope
    this._purposeConsents = purposeConsents
    this._vendorConsents = vendorConsents
  }

  get metadata() {
    return this._metadata
  }

  get gdprApplies() {
    return this._gdprApplies
  }

  get hasGlobalScope() {
    return this._hasGlobalScope
  }

  get purposeConsents() {
    return this._purposeConsents
  }

  get vendorConsents() {
    return this._vendorConsents
  }
}
