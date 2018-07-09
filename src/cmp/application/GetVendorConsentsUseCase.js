import filterConsentMustExist from '../domain/filterConsentMustExist'

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
}) => vendorConsentsRepository.getVendorConsents({allowedVendorIds})
