import {consentHasAllInStatus} from './consentValidation'

export default class UpdateConsentVendorsService {
  constructor({
    vendorListRepository,
    newVendorsStatusFactory,
    vendorConsentsRepository
  }) {
    this._getGlobalVendorList = getGlobalVendorList({vendorListRepository})
    this._saveVendorConsents = saveVendorConsents({vendorConsentsRepository})
    this._updateConsentWithNewGlobalVendorList = updateConsentWithNewGlobalVendorList(
      {newVendorsStatusFactory}
    )
  }

  updateConsentVendorList({
    consentAcceptedVendors,
    consentAcceptedPurposes,
    consentGlobalVendorListVersion,
    currentGlobalVendorList,
    allowedVendorIds
  }) {
    return Promise.resolve()
      .then(
        () =>
          consentGlobalVendorListVersion ===
          currentGlobalVendorList.vendorListVersion
            ? Promise.resolve()
            : this._getGlobalVendorList({
                vendorListVersion: consentGlobalVendorListVersion
              })
                .then(oldGlobalVendorList =>
                  this._updateConsentWithNewGlobalVendorList({
                    acceptedVendorIds: consentAcceptedVendors,
                    newGlobalVendorList: currentGlobalVendorList,
                    oldGlobalVendorList,
                    allowedVendorIds
                  })
                )
                .then(newAcceptedVendorIds =>
                  this._saveVendorConsents({
                    purposeConsents: consentAcceptedPurposes,
                    vendorConsents: newAcceptedVendorIds
                  })
                )
      )
      .then(null)
  }
}

const updateConsentWithNewGlobalVendorList = ({newVendorsStatusFactory}) => ({
  acceptedVendorIds,
  oldGlobalVendorList,
  newGlobalVendorList,
  allowedVendorIds
}) =>
  Promise.all([
    consentHasAllInStatus({
      acceptedVendorIds,
      globalVendorList: oldGlobalVendorList,
      allowedVendorIds
    }).then(acceptationStatus =>
      newVendorsStatusFactory.from({acceptationStatus})
    ),
    Promise.resolve(
      oldGlobalVendorList.vendors
        .map(vendor => vendor.id)
        .filter(id => newGlobalVendorList.vendors.indexOf(id) < 0)
    ),
    Promise.resolve(
      newGlobalVendorList.vendors
        .map(vendor => vendor.id)
        .filter(id => oldGlobalVendorList.vendors.indexOf(id) < 0)
    )
  ]).then(
    ([
      newVendorsAcceptationStatus,
      oldIdsNotInNewGlobalVendors,
      newIdsNotInOldGlobalVendors
    ]) => {
      let newAcceptedVendorIds = acceptedVendorIds.filter(
        id =>
          oldIdsNotInNewGlobalVendors.indexOf(id) < 0 &&
          ((allowedVendorIds && allowedVendorIds.indexOf(id) >= 0) || true)
      )
      if (newVendorsAcceptationStatus) {
        newIdsNotInOldGlobalVendors.forEach(id => newAcceptedVendorIds.push(id))
      }
      return newAcceptedVendorIds.filter(
        id => (allowedVendorIds && allowedVendorIds.indexOf(id) >= 0) || true
      )
    }
  )

const getGlobalVendorList = ({vendorListRepository}) => ({
  vendorListVersion
} = {}) => vendorListRepository.getGlobalVendorList({vendorListVersion})

const saveVendorConsents = ({vendorConsentsRepository}) => ({vendorConsents}) =>
  vendorConsentsRepository.saveVendorConsents({vendorConsents})
