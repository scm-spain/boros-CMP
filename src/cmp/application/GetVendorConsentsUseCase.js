import UnexistingConsentDataError from '../domain/UnexistingConsentDataError'

export default class GetVendorConsentsUseCase {
  constructor({
    consentRepository,
    vendorRepository,
    consentFactory,
    vendorConsentsFactory
  }) {
    this._consentRepository = consentRepository
    this._vendorRepository = vendorRepository
    this._consentFactory = consentFactory
    this._vendorConsentsFactory = vendorConsentsFactory
  }
  getVendorConsents({vendorIds}) {
    return Promise.resolve()
      .then(() =>
        Promise.all([
          this._consentRepository
            .getConsentData()
            .then(consentString => this._filterConsentMustExist),
          this._vendorRepository.getGlobalVendorList()
        ])
      )
      .then(([consentString, globalVendorList]) =>
        this._consentFactory
          .createConsent({consentString, globalVendorList})
          .then(consent =>
            this._vendorConsentsFactory.createVendorConsents({
              consent,
              globalVendorList,
              allowedVendorIds: vendorIds
            })
          )
      )
  }

  _filterConsentMustExist(consent) {
    if (!consent) {
      throw new UnexistingConsentDataError()
    }
    return consent
  }
}
