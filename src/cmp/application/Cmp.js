import commandConsumer from './services/commandConsumer'
import buildValidVendorConsents from './services/vendor_consents/buildValidVendorConsents'

export default class Cmp {
  /**
   *
   * @param container
   */
  constructor({container}) {
    this._container = container
  }

  getVendorConsents(vendorIds) {
    return this._container
      .getInstance({key: 'GetVendorConsentsUseCase'})
      .getVendorConsents({vendorIds})
  }

  setVendorConsents(vendorConsents) {
    return Promise.resolve(vendorConsents)
      .then(buildValidVendorConsents)
      .then(validVendorConsents =>
        this._container
          .getInstance({key: 'SetVendorConsentsUseCase'})
          .setVendorConsents({vendorConsents: validVendorConsents})
      )
  }

  getConsentData(consentStringVersion) {
    return this._container
      .getInstance({key: 'GetConsentDataUseCase'})
      .getConsentData({consentStringVersion})
  }

  ping(_) {
    return this._container.getInstance({key: 'PingUseCase'}).ping()
  }

  getVendorList(vendorListVersion) {
    return this._container
      .getInstance({key: 'GetVendorListUseCase'})
      .getVendorList({vendorListVersion})
  }

  getConsentStatus(_) {
    return this._container
      .getInstance({key: 'GetConsentStatusUseCase'})
      .getConsentStatus()
  }

  /**
   *
   * @returns {*}
   */
  commandConsumer() {
    return commandConsumer(this._container.getInstance({key: 'Log'}))(this)
  }
}
