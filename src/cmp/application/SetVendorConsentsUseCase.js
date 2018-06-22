export default class SetVendorConsentsUseCase {
  constructor({consentRepository}) {
    this._consentRepository = consentRepository
  }
  /**
   * Set Vendor Consents
   * @param vendorConsents
   * @return {Promise<void>}
   */
  setVendorConsents({vendorConsents}) {
    return Promise.resolve()
      .then(() => {
        this._generateConsentData({vendorConsents})
      })
      .then(generatedConsentData => {
        this._consentRepository.setVendorConsents({vendorConsents})
      })
      .then(result => {})
      .catch(e => {})
  }

  _generateConsentData({vendorConsents}) {
    return Promise.resolve().then(() => {
      return {}
    })
  }
}
