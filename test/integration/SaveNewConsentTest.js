import {CMP} from './testinit'
import {
  CONSENT_STATUS_ACCEPTED,
  CONSENT_STATUS_NOT_ACCEPTED
} from '../../src/cmp/domain/consentStatus'
import CMPFacade from './application/CMPFacade'

const cmpClient = new CMPFacade({cmp: CMP})

describe('Save New Consent', () => {
  it('Should accept a new Vendor Consents object', done => {
    Promise.resolve()
      .then(() => cmpClient.getConsentStatus())
      .then(consentStatus =>
        filterConsentStatus(consentStatus, CONSENT_STATUS_NOT_ACCEPTED)
      )
      .then(() => cmpClient.setVendorConsents(sampleVendorConsentsEditedInAnUI))
      .then(() => cmpClient.getConsentStatus())
      .then(consentStatus =>
        filterConsentStatus(consentStatus, CONSENT_STATUS_ACCEPTED)
      )
      .then(() => done())
      .catch(e => done(e))
  })
})

const filterConsentStatus = (consentStatus, status) => {
  if (consentStatus.result !== status) {
    throw new Error('Consent Status should be: ' + status)
  }
  return consentStatus.result
}
const sampleVendorConsentsEditedInAnUI = {
  purposeConsents: [1, 2, 3, 4],
  vendorConsents: [1, 2, 3, 6, 7, 8]
}
