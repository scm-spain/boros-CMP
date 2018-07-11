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

  getGlobalVendorList() {
    return Promise.resolve()
      .then(this._getLocalVendorList)
      .then(
        globalVendorList =>
          globalVendorList ||
          this._getRemoteVendorList().then(globalVendorList =>
            this._saveRemoteVendorListToLocal({globalVendorList}).then(
              () => globalVendorList
            )
          )
      )
  }
}

const getLocalVendorList = ({inMemoryVendorListRepository}) => () =>
  inMemoryVendorListRepository.getGlobalVendorList()

const getRemoteVendorList = ({httpVendorListRepository}) => () =>
  httpVendorListRepository.getGlobalVendorList()

const saveRemoteVendorListToLocal = ({inMemoryVendorListRepository}) => ({
  globalVendorList
}) =>
  inMemoryVendorListRepository.setGlobalVendorList({
    globalVendorList
  })
