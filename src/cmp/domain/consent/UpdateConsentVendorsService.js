import {isWhitelisted} from '../vendor_consents/whitelistFilter'

export default class UpdateConsentVendorsService {
  constructor({
    vendorListRepository,
    newVendorsStatusService,
    vendorConsentsRepository
  }) {
    this._newVendorsStatusService = newVendorsStatusService
    this._getGlobalVendorList = getGlobalVendorList({vendorListRepository})
    this._saveVendorConsents = saveVendorConsents({vendorConsentsRepository})
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
          currentGlobalVendorList.vendors.map(vendor => vendor.id),
          oldGlobalVendorList.vendors.map(vendor => vendor.id)
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

  _updateConsentWithNewGlobalVendorList({
    acceptedVendorIds,
    oldGlobalVendorIds,
    newGlobalVendorIds,
    allowedVendorIds
  }) {
    return Promise.all([
      this._newVendorsStatusService.getNewVendorsStatus({
        acceptedVendorIds,
        globalVendorIds: oldGlobalVendorIds,
        allowedVendorIds
      }),
      oldGlobalVendorIds.filter(id => newGlobalVendorIds.indexOf(id) < 0),
      newGlobalVendorIds.filter(id => oldGlobalVendorIds.indexOf(id) < 0)
    ]).then(
      ([
        newVendorsStatus,
        oldIdsNotInNewGlobalVendors,
        newIdsNotInOldGlobalVendors
      ]) => {
        // TODO fn remove ids accepted in the consent that they are not anymore in the new global list
        let newAcceptedVendorIds = acceptedVendorIds.filter(
          id => oldIdsNotInNewGlobalVendors.indexOf(id) < 0
        )

        // TODO fn new ids from the global list that were not in the old list has to be added in the consent if they are accepted
        if (newVendorsStatus) {
          newIdsNotInOldGlobalVendors.forEach(id =>
            newAcceptedVendorIds.push(id)
          )
        }

        // TODO fn does not matter if they are or not in global lists, all ids that are not allowed have to be removed
        return newAcceptedVendorIds.filter(
          // TODO change allowed vendor ids to withelisted vendors
          id =>
            isWhitelisted({
              whitelist: allowedVendorIds,
              id
            })
        )
      }
    )
  }
}

const getGlobalVendorList = ({vendorListRepository}) => ({
  vendorListVersion
} = {}) => vendorListRepository.getGlobalVendorList({vendorListVersion})

const saveVendorConsents = ({vendorConsentsRepository}) => ({
  vendorConsents,
  purposeConsents
}) =>
  vendorConsentsRepository.saveVendorConsents({vendorConsents, purposeConsents})
