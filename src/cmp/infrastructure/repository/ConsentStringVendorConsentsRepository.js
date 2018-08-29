import {ConsentString} from 'consent-string'

/**
 * @class
 * @implements VendorConsentsRepository
 */
export default class ConsentStringVendorConsentsRepository {
  /**
   *
   * @param cmpId {number}
   * @param cmpVersion {number}
   * @param consentScreen {number}
   * @param consentLanguage {string}
   * @param vendorConsentsFactory {VendorConsentsFactory}
   * @param consentRepository {VendorConsentsRepository}
   * @param vendorListRepository {VendorListRepository}
   */
  constructor({
    cmpId = requiredArg('cmpId'),
    cmpVersion = requiredArg('cmpVersion'),
    consentScreen = requiredArg('consentScreen'),
    consentLanguage = requiredArg('consentLanguage'),
    vendorConsentsFactory,
    consentRepository,
    vendorListRepository
  } = {}) {
    this._cmpId = cmpId
    this._cmpVersion = cmpVersion
    this._consentScreen = consentScreen
    this._consentLanguage = consentLanguage
    this._vendorConsentsFactory = vendorConsentsFactory
    this._consentRepository = consentRepository
    this._vendorListRepository = vendorListRepository
  }

  getVendorConsents({allowedVendorIds} = {}) {
    return Promise.resolve()
      .then(() =>
        Promise.all([this._getStoredConsent(), this._getGlobalVendorList()])
      )
      .then(
        ([consent, globalVendorList]) =>
          (consent &&
            this._createVendorConsents({
              consent,
              globalVendorList,
              allowedVendorIds
            })) ||
          undefined
      )
  }

  saveVendorConsents({vendorConsents}) {
    return Promise.resolve().then(() =>
      Promise.all([
        this._mapVendorConsentsToConsent({vendorConsents}),
        this._getGlobalVendorList()
      ])
        .then(([consent, globalVendorList]) => {
          consent.setGlobalVendorList(globalVendorList)
          return consent
        })
        .then(consent => this._saveConsent({consent}))
    )
  }

  _getStoredConsent() {
    return this._consentRepository.getConsent()
  }

  _saveConsent({consent}) {
    return this._consentRepository.saveConsent({consent})
  }

  _createVendorConsents({consent, globalVendorList, allowedVendorIds}) {
    return this._vendorConsentsFactory.createVendorConsents({
      consent,
      globalVendorList,
      allowedVendorIds
    })
  }

  _getGlobalVendorList() {
    return this._vendorListRepository.getGlobalVendorList()
  }

  _mapVendorConsentsToConsent({vendorConsents}) {
    let consent = new ConsentString()
    consent.setVendorsAllowed(vendorConsents.vendorConsents)
    consent.setPurposesAllowed(vendorConsents.purposeConsents)
    consent.setCmpId(this._cmpId)
    consent.setCmpVersion(this._cmpVersion)
    consent.setConsentScreen(this._consentScreen)
    consent.setConsentLanguage(this._consentLanguage)
    return consent
  }
}

const requiredArg = fieldName => {
  throw new Error(`Error: ${fieldName} is required`)
}
