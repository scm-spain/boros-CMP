export default class IABConsentManagementProviderV1 {
  constructor({
    getVendorConsentsUseCase,
    getConsentDataUseCase,
    pingUseCase,
    getVendorListUseCase,
    getConsentStatusUseCase,
    setVendorConsentsUseCase
  }) {
    this._getVendorConsentsUseCase = getVendorConsentsUseCase
    this._getConsentDataUseCase = getConsentDataUseCase
    this._pingUseCase = pingUseCase
    this._getVendorListUseCase = getVendorListUseCase
    this._getConsentStatusUseCase = getConsentStatusUseCase
    this._setVendorConsentsUseCase = setVendorConsentsUseCase
  }

  getVendorConsents(vendorIds) {
    return this._getVendorConsentsUseCase.getVendorConsents({vendorIds})
  }

  setVendorConsents(vendorConsents) {
    return this._setVendorConsentsUseCase.setVendorConsents({vendorConsents})
  }

  getConsentData(consentStringVersion) {
    return this._getConsentDataUseCase.getConsentData({consentStringVersion})
  }

  ping(_) {
    return this._pingUseCase.ping()
  }

  getVendorList(vendorListVersion) {
    return this._getVendorListUseCase.getVendorList({vendorListVersion})
  }

  getConsentStatus(_) {
    return this._getConsentStatusUseCase.getConsentStatus()
  }
}
