import {consentHasAllInStatus} from './consentValidation'

export default class UpdateConsentVendorsService {
  constructor({
    vendorListRepository,
    consentRepository,
    newVendorsStatusResolverFactory
  }) {
    this._getGlobalVendorList = getGlobalVendorList({vendorListRepository})
    this._saveConsent = saveConsent({consentRepository})
    this._updateConsentWithNewGlobalVendorList = updateConsentWithNewGlobalVendorList(
      {newVendorsStatusResolverFactory}
    )
  }

  updateConsentVendorList({
    consent,
    currentGlobalVendorList,
    allowedVendorIds
  }) {
    return Promise.resolve()
      .then(
        () =>
          consent.getVendorListVersion() ===
          currentGlobalVendorList.vendorListVersion
            ? Promise.resolve()
            : this._getGlobalVendorList({
                vendorListVersion: consent.getVendorListVersion()
              }).then(oldGlobalVendorList =>
                this._updateConsentWithNewGlobalVendorList({
                  consent,
                  newGlobalVendorList: currentGlobalVendorList,
                  oldGlobalVendorList,
                  allowedVendorIds
                })
              )
      )
      .then(consent => this._saveConsent({consent}))
      .then(null)
  }
}

const updateConsentWithNewGlobalVendorList = ({
  newVendorsAcceptationStatusFactory
}) => ({consent, oldGlobalVendorList, newGlobalVendorList, allowedVendorIds}) =>
  Promise.all([
    consentHasAllInStatus({
      consent,
      globalVendorList: oldGlobalVendorList,
      allowedVendorIds
    }).then(acceptationStatus =>
      newVendorsAcceptationStatusFactory.from({acceptationStatus})
    ),
    Promise.resolve(
      oldGlobalVendorList.vendors
        .map(vendor => vendor.id)
        .filter(id => newGlobalVendorList.vendors.indexOf(id) < 0)
    ),
    Promise.resolve(
      newGlobalVendorList.vendors
        .map(vendor => vendor.id)
        .filter(
          id =>
            oldGlobalVendorList.vendors.indexOf(id) < 0 &&
            (!allowedVendorIds || allowedVendorIds.indexOf(id) >= 0)
        )
    )
  ]).then(
    ([
      newVendorsAcceptationStatus,
      oldIdsNotInNewGlobalVendors,
      newIdsNotInOldGlobalVendors
    ]) => {
      oldIdsNotInNewGlobalVendors.forEach(id => {
        consent.setVendorAllowed(id, false)
      })
      newIdsNotInOldGlobalVendors.forEach(id => {
        consent.setVendorAllowed(id, newVendorsAcceptationStatus)
      })
      return consent
    }
  )

const getGlobalVendorList = ({vendorListRepository}) => ({
  vendorListVersion
} = {}) => vendorListRepository.getGlobalVendorList({vendorListVersion})

const saveConsent = ({consentRepository}) => ({consent}) =>
  consentRepository.saveConsent({consent})
