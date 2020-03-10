export default class GetVendorListUseCase {
  constructor({vendorListRepository}) {
    this._vendorListRepository = vendorListRepository
  }

  /**
   * The result will be the GlobalVendorList being the vendor list object of the requested version.
   * If the vendorListVersion is null, the vendor list for the VendorListVersion in the current consent string is returned.
   * If no consent string value is currently set, the latest version of the vendor list is returned.
   * If the vendorListVersion value is ?LATEST?, the latest version available is returned.
   * If the vendorListVersion is invalid, an InvalidVendorListError is thrown.
   * @param vendorListVersion
   */
  getVendorList({vendorListVersion = null} = {}) {
    return Promise.resolve().then(() =>
      this._vendorListRepository.getGlobalVendorList({vendorListVersion})
    )
  }
}
