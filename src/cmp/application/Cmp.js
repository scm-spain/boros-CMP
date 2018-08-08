import commandConsumer from './services/commandConsumer'

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
    return this._container
      .getInstance({key: 'SetVendorConsentsUseCase'})
      .setVendorConsents({vendorConsents})
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
