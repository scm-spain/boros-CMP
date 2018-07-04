/**
 * @class
 * @implements VendorListRepository
 */
export default class InMemoryVendorListRepository {
  constructor({globalVendorList} = {}) {
    this._globalVendorList = globalVendorList
  }

  getGlobalVendorList() {
    return Promise.resolve(this._globalVendorList)
  }

  setGlobalVendorList({globalVendorList}) {
    return Promise.resolve()
      .then(() => (this._globalVendorList = globalVendorList))
      .then(() => this._globalVendorList)
  }
}
