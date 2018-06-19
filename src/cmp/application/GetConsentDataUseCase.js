export default class GetConsentDataUseCase {
  constructor({consentRepository}) {
    this._consentRepository = consentRepository
  }

  /**
   * Returns Vendor Consent Data.
   * @param consentStringVersion - Not supported yet.
   * @return {Promise<void>}
   */
  getConsentData({consentStringVersion = null} = {}) {
    // TODO: support consentStringVersion.
    return Promise.resolve().then(() =>
      this._consentRepository.getConsentData()
    )
  }
}
