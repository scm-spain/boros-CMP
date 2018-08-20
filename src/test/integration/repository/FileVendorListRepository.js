/**
 * @class
 * @implements VendorListRepository
 */
export default class FileVendorListRepository {
  constructor({
    globalVendorListLocation = '../../resources/globalvendorlist.json'
  } = {}) {
    this._globalVendorListLocation = globalVendorListLocation
  }
  getGlobalVendorList() {
    return Promise.resolve().then(() => require(this._globalVendorListLocation))
  }
}
