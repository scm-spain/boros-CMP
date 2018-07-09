import {ConsentString} from 'consent-string'

/**
 * @class
 * @implements VendorConsentsRepository
 */
export default class ConsentStringVendorConsentsRepository {
  constructor({
    cmpId = 1,
    cmpVersion = 1,
    consentScreen = 1,
    consentLanguage = 'en',
    vendorConsentsFactory,
    consentRepository,
    vendorListRepository
  } = {}) {
    this._getStoredConsent = getStoredConsent({consentRepository})
    this._saveConsent = saveConsent({consentRepository})
    this._createVendorConsents = createVendorConsents({vendorConsentsFactory})
    this._getGlobalVendorList = getGlobalVendorList({vendorListRepository})
    this._mapVendorConsentsToConsent = mapVendorConsentsToConsent({
      cmpId,
      cmpVersion,
      consentScreen,
      consentLanguage
    })
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
}

const getStoredConsent = ({consentRepository}) => () =>
  consentRepository.getConsent()

const saveConsent = ({consentRepository}) => ({consent}) =>
  consentRepository.saveConsent({consent})

const createVendorConsents = ({vendorConsentsFactory}) => ({
  consent,
  globalVendorList,
  allowedVendorIds
}) =>
  vendorConsentsFactory.createFromConsent({
    consent,
    globalVendorList,
    allowedVendorIds
  })

const getGlobalVendorList = ({vendorListRepository}) => () =>
  vendorListRepository.getGlobalVendorList()

const mapVendorConsentsToConsent = ({
  cmpId,
  cmpVersion,
  consentScreen,
  consentLanguage
}) => ({vendorConsents}) => {
  let consent = new ConsentString()
  consent.setVendorsAllowed(vendorConsents.vendorConsents)
  consent.setPurposesAllowed(vendorConsents.purposeConsents)
  consent.setCmpId(cmpId)
  consent.setCmpVersion(cmpVersion)
  consent.setConsentScreen(consentScreen)
  consent.setConsentLanguage(consentLanguage)
  return consent
}
