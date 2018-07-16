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

  getVendorConsents(vendorIds, observer) {
    return this._getVendorConsentsUseCase
      .getVendorConsents({vendorIds})
      .then(vendorConsents => observer(vendorConsents, true))
      .catch(e => observer(null, false))
  }

  setVendorConsents(vendorConsents, observer) {
    return this._setVendorConsentsUseCase
      .setVendorConsents({vendorConsents})
      .then(() => observer(null, true))
      .catch(e => observer(null, false))
  }

  getConsentData(consentStringVersion, observer) {
    return this._getConsentDataUseCase
      .getConsentData({consentStringVersion})
      .then(vendorConsentData => observer(vendorConsentData, true))
      .catch(e => observer(null, false))
  }

  ping(_, observer) {
    return this._pingUseCase
      .ping()
      .then(pingReturn => observer(pingReturn, true))
      .catch(e => observer(null, false))
  }

  getVendorList(vendorListVersion, observer) {
    return this._getVendorListUseCase
      .getVendorList({vendorListVersion})
      .then(globalVendorList => observer(globalVendorList, true))
      .catch(e => observer(null, false))
  }

  getConsentStatus(_, observer) {
    return this._getConsentStatusUseCase
      .getConsentStatus()
      .then(consentStatus => observer(consentStatus, true))
      .catch(e => observer(null, false))
  }
}
