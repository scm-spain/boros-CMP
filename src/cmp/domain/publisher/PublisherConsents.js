export default class PublisherConsents {
  /**
   * Creates a PublisherConsents
   *
   * @param {String} metadata : encoded string in the publisher consent format
   * @param {Boolean} gdprApplies
   * @param {Boolean} hasGlobalScope
   * @param {[Consent]} standardPurposes
   * @param {[Consent]} customPurposes
   */
  constructor({
    metadata,
    gdprApplies,
    hasGlobalScope,
    standardPurposes,
    customPurposes
  }) {
    this._metadata = metadata
    this._gdprApplies = gdprApplies
    this._hasGlobalScope = hasGlobalScope
    this._standardPurposes = standardPurposes
    this._customPurposes = customPurposes
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

  get standardPurposes() {
    return this._standardPurposes
  }

  get customPurposes() {
    return this._customPurposes
  }
}
