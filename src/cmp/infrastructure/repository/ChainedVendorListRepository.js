/**
 * @class
 * @implements VendorListRepository
 */
export default class ChainedVendorListRepository {
  constructor({inMemoryVendorListRepository, httpVendorListRepository} = {}) {
    this._getLocalVendorList = getLocalVendorList({
      inMemoryVendorListRepository
    })
    this._getRemoteVendorList = getRemoteVendorList({httpVendorListRepository})
    this._saveRemoteVendorListToLocal = saveRemoteVendorListToLocal({
      inMemoryVendorListRepository
    })
    this._requested = new Map()
  }

  getGlobalVendorList({vendorListVersion} = {}) {
    if (!this._requested.has(vendorListVersion)) {
      const request = Promise.resolve()
        .then(() => this._getLocalVendorList({vendorListVersion}))
        .then(
          globalVendorList =>
            globalVendorList ||
            this._getRemoteVendorList({
              vendorListVersion
            }).then(globalVendorList =>
              this._saveRemoteVendorListToLocal({globalVendorList}).then(
                () => globalVendorList
              )
            )
        )
      this._requested.set(vendorListVersion, request)
    }
    return this._requested.get(vendorListVersion)
  }
}

const getLocalVendorList = ({inMemoryVendorListRepository}) => ({
  vendorListVersion
}) => inMemoryVendorListRepository.getGlobalVendorList({vendorListVersion})

const getRemoteVendorList = ({httpVendorListRepository}) => ({
  vendorListVersion
}) => httpVendorListRepository.getGlobalVendorList({vendorListVersion})

const saveRemoteVendorListToLocal = ({inMemoryVendorListRepository}) => ({
  globalVendorList
}) =>
  inMemoryVendorListRepository.setGlobalVendorList({
    globalVendorList
  })
