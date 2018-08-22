import {consentHasAllInStatus} from './consentValidation'

export default class UpdateConsentVendorsService {
  constructor({
    vendorListRepository,
    vendorConsentsRepository,
    newVendorsStatusResolverFactory
  }) {
    this._updateConsentWithNewGlobalVendorList = updateConsentWithNewGlobalVendorList(
      {newVendorsStatusResolverFactory}
    )
    this._getGlobalVendorList = getGlobalVendorList({vendorListRepository})
  }

  updateConsentVendorList({consent, currentGlobalVendorList}) {
    return Promise.resolve()
      .then(
        () =>
          consent.getVendorListVersion() ===
          currentGlobalVendorList.vendorListVersion
            ? Promise.resolve()
            : this._updateConsentWithNewGlobalVendorList({
                consent,
                globalVendorList: currentGlobalVendorList
              })
      )
      .then(null)
  }
}

const updateConsentWithNewGlobalVendorList = ({
  newVendorsStatusResolverFactory
}) => ({consent, oldGlobalVendorList, newGlobalVendorList, allowedVendorIds}) =>
  Promise.resolve(
    consentHasAllInStatus({
      consent,
      globalVendorList: oldGlobalVendorList,
      allowedVendorIds
    })
  ).then(consentStatus => newVendorsStatusResolverFactory.from({consentStatus}))

const getGlobalVendorList = ({vendorListRepository}) => ({
  vendorListVersion
} = {}) => vendorListRepository.getGlobalVendorList({vendorListVersion})
