import filterConsentMustExist from '../../domain/filterConsentMustExist'

export default class GetConsentDataUseCase {
  constructor({
    gdprApplies = true,
    storeConsentGlobally = false,
    consentRepository
  } = {}) {
    this._gdprApplies = gdprApplies
    this._storeConsentGlobally = storeConsentGlobally
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
      .then(this._getStoredConsent)
      .then(filterConsentMustExist)
      .then(consent => ({
        gdprApplies: this._gdprApplies,
        hasGlobalScope: this._storeConsentGlobally,
        consentData: consent.getConsentString(false)
      }))
  }
}

const getStoredConsent = ({consentRepository}) => () =>
  consentRepository.getConsent()
