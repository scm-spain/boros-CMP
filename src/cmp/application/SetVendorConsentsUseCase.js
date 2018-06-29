export default class SetVendorConsentsUseCase {
  constructor({vendorConsentsRepository}) {
    this._saveVendorConsents = saveVendorConsents({
      vendorConsentsRepository
    })
  }

  setVendorConsents({vendorConsents} = {}) {
    return Promise.resolve().then(() =>
      this._saveVendorConsents({vendorConsents})
    )
  }
}

const saveVendorConsents = ({vendorConsentsRepository}) => ({vendorConsents}) =>
  vendorConsentsRepository.saveVendorConsents({vendorConsents})
