/* eslint-disable no-undef */
import 'whatwg-fetch'
import GlobalVendorListAccessError from '../../domain/vendor_list/GlobalVendorListAccessError'

/**
 * @class
 * @implements VendorListRepository
 */
export default class HttpVendorListRepository {
  constructor({vendorListHost, vendorListFilename}) {
    this._vendorListHost = vendorListHost
    this._vendorListFilename = vendorListFilename
  }

  getGlobalVendorList({vendorListVersion} = {}) {
    return Promise.resolve()
      .then(
        () =>
          (vendorListVersion &&
            this._loadVendorListVersion({vendorListVersion})) ||
          this._loadLatestVendorList()
      )
      .then(filterOkFetchResponse)
      .then(fetchResponse => fetchResponse.json())
  }

  _loadLatestVendorList() {
    // 'https://vendorlist.consensu.org/vendorlist.json'
    return fetch(this._vendorListHost + '/' + this._vendorListFilename)
  }

  _loadVendorListVersion({vendorListVersion}) {
    // `https://vendorlist.consensu.org/v-${vendorListVersion}/vendorlist.json`
    return fetch(
      this._vendorListHost +
        '/v-' +
        vendorListVersion +
        '/' +
        this._vendorListFilename
    )
  }
}

const filterOkFetchResponse = fetchResponse => {
  if (!fetchResponse.ok) {
    throw new GlobalVendorListAccessError(
      'Invalid response fetching the global vendor list'
    )
  }
  return fetchResponse
}
