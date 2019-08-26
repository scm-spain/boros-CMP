/* eslint-disable no-undef */
import 'isomorphic-unfetch'
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
    return Promise.resolve(
      this._vendorListHost +
        (vendorListVersion ? '/v-' + vendorListVersion : '') +
        '/' +
        this._vendorListFilename
    )
      .then(this._loadURL)
      .then(filterOkFetchResponse)
      .then(fetchResponse => fetchResponse.json())
  }

  _loadURL(url) {
    return fetch(url)
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
