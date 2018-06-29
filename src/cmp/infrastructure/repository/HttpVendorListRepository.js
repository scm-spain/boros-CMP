/* eslint-disable no-undef */
import 'whatwg-fetch'

/**
 * @class
 * @implements VendorListRepository
 */
export default class HttpVendorListRepository {
  constructor({
    globalVendorListLocation = 'https://vendorlist.consensu.org/vendorlist.json'
  } = {}) {
    this._globalVendorListLocation = globalVendorListLocation
  }

  getGlobalVendorList() {
    return Promise.resolve()
      .then(() => fetch(this._globalVendorListLocation))
      .then(fetchResponse => fetchResponse.json())
  }
}
