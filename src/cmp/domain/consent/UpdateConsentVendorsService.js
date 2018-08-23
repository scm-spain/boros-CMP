import {ConsentString} from 'consent-string'
import {consentHasAllInStatus} from './consentValidation'

export default class UpdateConsentVendorsService {
  constructor({
    vendorListRepository,
    newVendorsStatusResolverFactory,
    vendorConsentsRepository
  }) {
    this._getGlobalVendorList = getGlobalVendorList({vendorListRepository})
    this._saveVendorConsents = saveVendorConsents({vendorConsentsRepository})
    this._updateConsentWithNewGlobalVendorList = updateConsentWithNewGlobalVendorList(
      {newVendorsStatusResolverFactory}
    )
  }

  updateConsentVendorList({
    encodedConsent,
    currentGlobalVendorList,
    allowedVendorIds
  }) {
    return Promise.resolve(new ConsentString(encodedConsent))
      .then(
        consent =>
          consent.getVendorListVersion() ===
          currentGlobalVendorList.vendorListVersion
            ? Promise.resolve()
            : this._getGlobalVendorList({
                vendorListVersion: consent.getVendorListVersion()
              })
                .then(oldGlobalVendorList =>
                  this._updateConsentWithNewGlobalVendorList({
                    consent,
                    newGlobalVendorList: currentGlobalVendorList,
                    oldGlobalVendorList,
                    allowedVendorIds
                  })
                )
                .then(consent =>
                  mapConsentToVendorConsents({
                    consent,
                    globalVendorList: currentGlobalVendorList,
                    allowedVendorIds
                  })
                )
                .then(vendorConsents =>
                  this._saveVendorConsents({vendorConsents})
                )
      )
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

const saveVendorConsents = ({vendorConsentsRepository}) => ({vendorConsents}) =>
  vendorConsentsRepository.saveVendorConsents({vendorConsents})

const mapConsentToVendorConsents = ({
  consent,
  globalVendorList,
  allowedVendorIds
}) => ({
  purposeConsents: consent.getPurposesAllowed(),
  vendorConsents: globalVendorList.vendors
    .map(vendor => vendor.id)
    .filter(id => consent.isVendorAllowed(id))
})
