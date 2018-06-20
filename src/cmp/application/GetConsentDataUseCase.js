import VendorConsentData from '../domain/VendorConsentData'

export default class GetConsentDataUseCase {
  constructor({consentRepository, gdprApplies, hasGlobalScope}) {
    this._consentRepository = consentRepository
    this._gdprApplies = gdprApplies
    this._hasGlobalScope = hasGlobalScope
  }

  /**
   * Returns Vendor Consent Data.
   * @param consentStringVersion - Not supported yet.
   * @return {Promise<VendorConsentData>}
   */
  getConsentData({consentStringVersion = null} = {}) {
    // TODO: support consentStringVersion.
    return Promise.resolve()
      .then(() => this._consentRepository.getConsentData())
      .then(consentData => {
        return new VendorConsentData({
          hasGlobalScope: this._hasGlobalScope,
          gdprApplies: this._gdprApplies,
          consentData: consentData
        })
      })
  }
}
