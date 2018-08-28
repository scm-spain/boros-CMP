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
          consentGlobalVendorListVersion !==
            currentGlobalVendorList.vendorListVersion &&
          this._resolveNewAcceptedVendorIds({
            consentAcceptedVendors,
            consentGlobalVendorListVersion,
            currentGlobalVendorList,
            allowedVendorIds
          }).then(newAcceptedVendorIds =>
            this._saveVendorConsents({
              purposeConsents: consentAcceptedPurposes,
              vendorConsents: newAcceptedVendorIds
            })
          )
      )
      .then(null)
  }

  _resolveNewAcceptedVendorIds({
    consentAcceptedVendors,
    consentGlobalVendorListVersion,
    currentGlobalVendorList,
    allowedVendorIds
  }) {
    return this._getGlobalVendorList({
      vendorListVersion: consentGlobalVendorListVersion
    })
      .then(oldGlobalVendorList =>
        Promise.all([
          Promise.resolve(
            currentGlobalVendorList.vendors.map(vendor => vendor.id)
          ),
          Promise.resolve(oldGlobalVendorList.vendors.map(vendor => vendor.id))
        ])
      )
      .then(([currentGlobalVendorIds, oldGlobalVendorIds]) =>
        this._updateConsentWithNewGlobalVendorList({
          acceptedVendorIds: consentAcceptedVendors,
          newGlobalVendorIds: currentGlobalVendorIds,
          oldGlobalVendorIds: oldGlobalVendorIds,
          allowedVendorIds
        })
      )
  }
}

const updateConsentWithNewGlobalVendorList = ({newVendorsStatusFactory}) => ({
  acceptedVendorIds,
  oldGlobalVendorIds,
  newGlobalVendorIds,
  allowedVendorIds
}) =>
  Promise.all([
    consentHasAllInStatus({
      acceptedVendorIds,
      globalVendorIds: oldGlobalVendorIds,
      allowedVendorIds
    }).then(acceptationStatus =>
      newVendorsStatusFactory.from({acceptationStatus})
    ),
    Promise.resolve(
      oldGlobalVendorIds.filter(id => newGlobalVendorIds.indexOf(id) < 0)
    ),
    Promise.resolve(
      newGlobalVendorIds.filter(id => oldGlobalVendorIds.indexOf(id) < 0)
    )
  ]).then(
    ([
      newVendorsAcceptationStatus,
      oldIdsNotInNewGlobalVendors,
      newIdsNotInOldGlobalVendors
    ]) => {
      let newAcceptedVendorIds = acceptedVendorIds.filter(
        id => oldIdsNotInNewGlobalVendors.indexOf(id) < 0
      )
      if (newVendorsAcceptationStatus) {
        newIdsNotInOldGlobalVendors.forEach(id => newAcceptedVendorIds.push(id))
      }
      return newAcceptedVendorIds.filter(
        id =>
          (allowedVendorIds && allowedVendorIds.indexOf(id) >= 0) ||
          !allowedVendorIds
      )
    }
  )

const getGlobalVendorList = ({vendorListRepository}) => ({
  vendorListVersion
} = {}) => vendorListRepository.getGlobalVendorList({vendorListVersion})

const saveVendorConsents = ({vendorConsentsRepository}) => ({
  vendorConsents,
  purposeConsents
}) =>
  vendorConsentsRepository.saveVendorConsents({vendorConsents, purposeConsents})
