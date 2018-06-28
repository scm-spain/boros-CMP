import filterConsentMustExist from '../domain/filterConsentMustExist'

export default class GetConsentDataUseCase {
  constructor({
    gdprApplies = true,
    hasGlobalScope = false,
    consentRepository
  } = {}) {
    this._gdprApplies = gdprApplies
    this._hasGlobalScope = hasGlobalScope
    this._getStoredConsent = getStoredConsent({
      consentRepository
    })
  }

  /**
   * Returns Vendor Consent Data.
   * @param consentStringVersion - Not supported yet.
   * @return {Promise<VendorConsentData>}
   */
  getConsentData({consentStringVersion = null} = {}) {
    // TODO: support consentStringVersion.
    return Promise.resolve()
      .then(() => this._getStoredConsent())
      .then(filterConsentMustExist)
      .then(consent => ({
        gdprApplies: this._gdprApplies,
        hasGlobalScope: this._hasGlobalScope,
        consentData: consent.getConsentString(false)
      }))
  }
}

const getStoredConsent = ({consentRepository}) => () =>
  Promise.resolve().then(() => consentRepository.getConsent())
