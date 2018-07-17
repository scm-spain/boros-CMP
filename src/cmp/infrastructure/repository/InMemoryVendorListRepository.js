/**
 * @class
 * @implements VendorListRepository
 */
export default class InMemoryVendorListRepository {
  constructor({initialVendorList} = {}) {
    this._vendorListMap = new Map()
    if (initialVendorList) {
      this._vendorListMap.set(
        initialVendorList.vendorListVersion,
        initialVendorList
      )
    }
    this._latestVersion =
      (initialVendorList && initialVendorList.vendorListVersion) || undefined
  }

  getGlobalVendorList({vendorListVersion = this._latestVersion} = {}) {
    return Promise.resolve().then(
      () => vendorListVersion && this._vendorListMap.get(vendorListVersion)
    )
  }

  setGlobalVendorList({globalVendorList} = {}) {
    return Promise.resolve(globalVendorList.vendorListVersion).then(version => {
      this._vendorListMap.set(version, globalVendorList)
      this._latestVersion = Math.max(version, this._latestVersion)
    })
  }
}
