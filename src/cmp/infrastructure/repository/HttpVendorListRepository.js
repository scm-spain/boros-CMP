import GlobalVendorListAccessError from '../../domain/vendor_list/GlobalVendorListAccessError'

/**
 * @class
 * @implements VendorListRepository
 */
export default class HttpVendorListRepository {
  constructor({fetcher, vendorListHost, vendorListFilename}) {
    this._fetcher = fetcher
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
      .then(url => this._fetcher(url))
      .then(filterOkFetchResponse)
      .then(fetchResponse => fetchResponse.json())
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
