import UnexistingConsentDataError from '../domain/UnexistingConsentDataError'

export default class GetVendorConsentsUseCase {
  constructor({
    consentRepository,
    vendorRepository,
    consentFactory,
    vendorConsentsFactory
  }) {
    this._getStoredConsentData = getStoredConsentData({consentRepository})
    this._getGlobalVendorList = getGlobalVendorList({vendorRepository})
    this._createVendorConsents = createVendorConsents({
      consentFactory,
      vendorConsentsFactory
    })
  }

  getVendorConsents({vendorIds} = {}) {
    return Promise.resolve()
      .then(() =>
        Promise.all([
          this._getStoredConsentData().then(filterConsentMustExist),
          this._getGlobalVendorList()
        ])
      )
      .then(([consentString, globalVendorList]) =>
        this._createVendorConsents({
          consentString,
          globalVendorList,
          allowedVendorIds: vendorIds
        })
      )
  }
}
const getStoredConsentData = ({consentRepository}) => () =>
  Promise.resolve().then(() => consentRepository.getConsentData())

const getGlobalVendorList = ({vendorRepository}) => () =>
  Promise.resolve().then(() => vendorRepository.getGlobalVendorList())

const createVendorConsents = ({consentFactory, vendorConsentsFactory}) => ({
  consentString,
  globalVendorList,
  allowedVendorIds
}) =>
  Promise.resolve()
    .then(() => consentFactory.createConsent({consentString, globalVendorList}))
    .then(consent =>
      vendorConsentsFactory.createVendorConsents({
        consent,
        globalVendorList,
        allowedVendorIds
      })
    )

const filterConsentMustExist = consent => {
  if (!consent) {
    throw new UnexistingConsentDataError()
  }
  return consent
}
