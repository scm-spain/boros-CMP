export default class SetVendorConsentsUseCase {
  constructor({vendorConsentsRepository}) {
    this._vendorConsentsRepository = vendorConsentsRepository
  }

  setVendorConsents({vendorConsents} = {}) {
    return Promise.resolve().then(() =>
      this._vendorConsentsRepository.saveVendorConsents({
        vendorConsents: vendorConsents.vendorConsents,
        purposeConsents: vendorConsents.purposeConsents
      })
    )
  }
}
