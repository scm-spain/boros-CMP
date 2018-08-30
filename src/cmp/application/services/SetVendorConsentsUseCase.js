import {consentAttributeToArray} from '../../infrastructure/service/consentAttributeToArray'

export default class SetVendorConsentsUseCase {
  constructor({vendorConsentsRepository}) {
    this._vendorConsentsRepository = vendorConsentsRepository
  }

  setVendorConsents({vendorConsents} = {}) {
    return Promise.resolve()
      .then(() =>
        Promise.all([
          consentAttributeToArray(vendorConsents.vendorConsents),
          consentAttributeToArray(vendorConsents.purposeConsents)
        ])
      )
      .then(([vendorConsents, purposeConsents]) =>
        this._saveVendorConsents({vendorConsents, purposeConsents})
      )
  }

  _saveVendorConsents({vendorConsents, purposeConsents}) {
    return this._vendorConsentsRepository.saveVendorConsents({
      vendorConsents,
      purposeConsents
    })
  }
}
