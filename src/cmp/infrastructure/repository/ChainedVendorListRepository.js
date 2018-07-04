/**
 * @class
 * @implements VendorListRepository
 */
export default class ChainedVendorListRepository {
  constructor({inMemoryVendorListRepository, httpVendorListRepository} = {}) {
    this._inMemoryVendorListRepository = inMemoryVendorListRepository
    this._httpVendorListRepository = httpVendorListRepository
  }

  getGlobalVendorList() {
    return Promise.resolve()
      .then(() => this._inMemoryVendorListRepository.getGlobalVendorList())
      .then(
        globalVendorList =>
          globalVendorList ||
          this._httpVendorListRepository
            .getGlobalVendorList()
            .then(globalVendorList =>
              this._inMemoryVendorListRepository
                .setGlobalVendorList({
                  globalVendorList
                })
                .then(() => globalVendorList)
            )
      )
  }
}
