import {ConsentString} from 'consent-string'
import {
  CONSENT_STATUS_ACCEPTED,
  CONSENT_STATUS_NOT_ACCEPTED
} from '../../src/cmp/domain/consentStatus'
import initializeTestClientCMP from './initializeTestClientCMP'

describe('Save New Consent', () => {
  it('Should accept a new Vendor Consents object and then modifying it', done => {
    const cmpClient = initializeTestClientCMP()

    Promise.resolve()
      // client should check the status of the consent
      .then(() => cmpClient.getConsentStatus())
      // the first time, the consent should return NOT_ACCEPTED
      .then(consentStatusResult =>
        filterConsentStatus(
          consentStatusResult.result,
          CONSENT_STATUS_NOT_ACCEPTED
        )
      )
      // in that case, the client should get the global vendor list to show the UI tool to edit the consent and show it
      .then(() =>
        cmpClient.getVendorList().then(globalVendorListResult =>
          Promise.resolve()
            // after editing the consents, the client should save the vendor consents
            .then(() =>
              cmpClient.setVendorConsents(sampleVendorConsentsEditedInAnUI)
            )
            // just for validation, now the consent status should be ACCEPTED
            .then(() => cmpClient.getConsentStatus())
            .then(consentStatusResult =>
              filterConsentStatus(
                consentStatusResult.result,
                CONSENT_STATUS_ACCEPTED
              )
            )
            // any Advertising SDK that wants to get the consent, now will have it accessible getting the encoded consent data
            .then(() => cmpClient.getConsentData())
            .then(consentDataResult =>
              checkEncodedConsent({
                encodedConsent: consentDataResult.result.consentData,
                acceptedConsents: sampleVendorConsentsEditedInAnUI,
                globalVendorList: globalVendorListResult.result
              })
            )
        )
      )
      .then(() => done())
      .catch(e => done(e))
  })
})

const filterConsentStatus = (consentStatus, status) => {
  if (consentStatus !== status) {
    throw new Error('Consent Status should be: ' + status)
  }
  return consentStatus
}
const sampleVendorConsentsEditedInAnUI = {
  purposeConsents: [1, 2, 3, 4],
  vendorConsents: [1, 2, 3, 6, 7, 8]
}
const checkEncodedConsent = ({
  encodedConsent,
  acceptedConsents,
  globalVendorList
}) => {
  const consent = new ConsentString(encodedConsent)

  // the allowed purposes into the encoded consent should be the edited purposes in the UI
  globalVendorList.purposes.map(p => p.id).forEach(id => {
    if (
      acceptedConsents.purposeConsents.includes(id) &&
      !consent.isPurposeAllowed(id)
    ) {
      throw new Error(`Purpose ${id} should be allowed`)
    } else if (
      !acceptedConsents.purposeConsents.includes(id) &&
      consent.isPurposeAllowed(id)
    ) {
      throw new Error(`Purpose ${id} should not be allowed`)
    }
  })

  // the allowed vendors into the encoded consent should be the edited vendors in the UI
  globalVendorList.vendors.map(v => v.id).forEach(id => {
    if (
      acceptedConsents.vendorConsents.includes(id) &&
      !consent.isVendorAllowed(id)
    ) {
      throw new Error(`Vendor ${id} should be allowed`)
    } else if (
      !acceptedConsents.vendorConsents.includes(id) &&
      consent.isVendorAllowed(id)
    ) {
      throw new Error(`Vendor ${id} should not be allowed`)
    }
  })
}
