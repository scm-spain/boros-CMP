/**
 * @class
 * @implements VendorConsentsRepository
 */
export default class ConsentStringVendorConsentsRepository {
  constructor({
    vendorConsentsFactory,
    consentRepository,
    vendorListRepository
  }) {
    this._getStoredConsent = getStoredConsent({consentRepository})
    this._createVendorConsents = createVendorConsents({vendorConsentsFactory})
    this._getGlobalVendorList = getGlobalVendorList({vendorListRepository})
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

  saveVendorConsents() {
    throw new Error('Not ready')
  }
}

const getStoredConsent = ({consentRepository}) => () =>
  consentRepository.getConsent()

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
