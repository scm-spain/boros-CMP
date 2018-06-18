import InvalidVendorListVersionError from '../../domain/InvalidVendorListVersionError'

export default class IABConsentManagementProviderV1 {
  constructor({consentManagementProvider}) {
    this._consentManagementProvider = consentManagementProvider
  }

  getVendorConsents(vendorIds, observer) {
    return this._consentManagementProvider
      .getVendorConsents({vendorIds})
      .then(vendorConsents => observer(vendorConsents, true))
  }

  getConsentData(consentStringVersion, observer) {
    return this._consentManagementProvider
      .getConsentData({consentStringVersion})
      .then(vendorConsentData => observer(vendorConsentData, true))
  }

  ping(_, observer) {
    return this._consentManagementProvider
      .ping()
      .then(pingReturn => observer(pingReturn, true))
  }

  getVendorList(vendorListVersion, observer) {
    return this._consentManagementProvider
      .getVendorList({vendorListVersion})
      .then(globalVendorList => observer(globalVendorList, true))
      .catch(
        e =>
          e instanceof InvalidVendorListVersionError
            ? observer(null, false)
            : Promise.reject(e)
      )
  }
}
