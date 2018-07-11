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
  }

  getGlobalVendorList({vendorListVersion} = {}) {
    return Promise.resolve()
      .then(() => this._getLocalVendorList({vendorListVersion}))
      .then(
        globalVendorList =>
          globalVendorList ||
          this._getRemoteVendorList({vendorListVersion}).then(
            globalVendorList =>
              this._saveRemoteVendorListToLocal({globalVendorList}).then(
                () => globalVendorList
              )
          )
      )
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
