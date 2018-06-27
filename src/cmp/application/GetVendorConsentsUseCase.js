import UnexistingConsentDataError from '../domain/UnexistingConsentDataError'

export default class GetVendorConsentsUseCase {
  constructor({vendorConsentsRepository}) {
    this._getStoredVendorConsents = getStoredVendorConsents({
      vendorConsentsRepository
    })
  }

  getVendorConsents({vendorIds} = {}) {
    return Promise.resolve()
      .then(() => this._getStoredVendorConsents({allowedVendorIds: vendorIds}))
      .then(filterConsentMustExist)
  }
}

const getStoredVendorConsents = ({vendorConsentsRepository}) => ({
  allowedVendorIds
}) =>
  Promise.resolve().then(() =>
    vendorConsentsRepository.getVendorConsents({allowedVendorIds})
  )

const filterConsentMustExist = consent => {
  if (!consent) {
    throw new UnexistingConsentDataError()
  }
  return consent
}
