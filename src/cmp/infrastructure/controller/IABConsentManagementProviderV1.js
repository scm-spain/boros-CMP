import InvalidVendorListVersionError from '../../domain/InvalidVendorListVersionError'
import UnexistingConsentDataError from '../../domain/UnexistingConsentDataError'

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
      .catch(
        e =>
          e instanceof UnexistingConsentDataError
            ? observer(null, false)
            : Promise.reject(e)
      )
  }

  setVendorConsents(vendorConsents, observer) {
    return this._setVendorConsentsUseCase
      .setVendorConsents({vendorConsents})
      .then(() => observer(null, true))
  }

  getConsentData(consentStringVersion, observer) {
    return this._getConsentDataUseCase
      .getConsentData({consentStringVersion})
      .then(vendorConsentData => observer(vendorConsentData, true))
  }

  ping(_, observer) {
    return this._pingUseCase
      .ping()
      .then(pingReturn => observer(pingReturn, true))
  }

  getVendorList(vendorListVersion, observer) {
    return this._getVendorListUseCase
      .getVendorList({vendorListVersion})
      .then(globalVendorList => observer(globalVendorList, true))
      .catch(
        e =>
          e instanceof InvalidVendorListVersionError
            ? observer(null, false)
            : Promise.reject(e)
      )
  }

  getConsentStatus() {
    return this._getConsentStatusUseCase
      .getConsentStatus()
      .then(result => result)
  }
}
