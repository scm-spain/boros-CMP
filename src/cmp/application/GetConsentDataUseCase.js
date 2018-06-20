export default class GetConsentDataUseCase {
  constructor({consentRepository, gdprApplies, hasGlobalScope}) {
    this._consentRepository = consentRepository
    this._gdprApplies = gdprApplies
    this._hasGlobalScope = hasGlobalScope
  }

  /**
   * Returns Vendor Consent Data.
   * @param consentStringVersion - Not supported yet.
   * @return {Promise<Object>}
   */
  getConsentData({consentStringVersion = null} = {}) {
    // TODO: support consentStringVersion.
    return Promise.resolve().then(() =>
      this._consentRepository.getConsentData().then(consentData => {
        return {
          gdprApplies: this._gdprApplies,
          hasGlobalScope: this._hasGlobalScope,
          consentData: consentData
        }
      })
    )
  }
}
