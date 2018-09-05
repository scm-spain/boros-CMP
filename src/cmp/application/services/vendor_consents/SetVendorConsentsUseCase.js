export default class SetVendorConsentsUseCase {
  constructor({vendorConsentsRepository}) {
    this._vendorConsentsRepository = vendorConsentsRepository
  }

  setVendorConsents({vendorConsents} = {}) {
    return this._vendorConsentsRepository.saveVendorConsents({
      vendorConsents: vendorConsents.vendorConsents,
      purposeConsents: vendorConsents.purposeConsents
    })
  }
}
