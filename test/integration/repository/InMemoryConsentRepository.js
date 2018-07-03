/**
 * @class
 * @implements ConsentRepository
 */
export default class InMemoryConsentRepository {
  constructor({store = {}, log, consentFactory, vendorListRepository} = {}) {
    this._read = read({store, log})
    this._write = write({store, log})
    this._createConsent = createConsent({consentFactory})
    this._getGlobalVendorList = getGlobalVendorList({vendorListRepository})
  }

  getConsent() {
    return Promise.resolve()
      .then(() => Promise.all([this._read(), this._getGlobalVendorList()]))
      .then(
        ([encodedConsent, globalVendorList]) =>
          (encodedConsent &&
            this._createConsent({encodedConsent, globalVendorList})) ||
          undefined
      )
  }

  saveConsent({consent}) {
    return Promise.resolve()
      .then(() => consent.getConsentString())
      .then(encodedConsent => this._write({value: encodedConsent}))
  }
}

const read = ({store, log}) => () => Promise.resolve(store.value)
const write = ({store, log}) => ({value}) =>
  Promise.resolve().then(() => (store.value = value))

const getGlobalVendorList = ({vendorListRepository}) => () =>
  vendorListRepository.getGlobalVendorList()

const createConsent = ({consentFactory}) => ({
  encodedConsent,
  globalVendorList
}) => consentFactory.createConsent({encodedConsent, globalVendorList})
