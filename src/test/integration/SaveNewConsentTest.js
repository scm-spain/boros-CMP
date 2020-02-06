/* eslint-disable no-console */
import {ConsentString} from 'consent-string'
import {
  CONSENT_STATUS_ACCEPTED,
  CONSENT_STATUS_NOT_ACCEPTED
} from '../../cmp/domain/consent/consentStatus'
import {
  initializeGlobalStoreTestClientCMP,
  initializeLocalStoreTestClientCMP
} from './initializeTestClientCMP'

describe('Local Store Save New Consent', () => {
  it('Should accept a new Vendor Consents object and then modifying it', () => {
    Promise.resolve()
      .then(() => initializeLocalStoreTestClientCMP())
      // client should check the status of the consent
      .then(cmpClient => doTheJob({cmpClient}))
  })
})

describe('Global Store Save New Consent', () => {
  it('Should accept a new Vendor Consents object and then modifying it', () => {
    Promise.resolve()
      .then(() => initializeGlobalStoreTestClientCMP())
      // client should check the status of the consent
      .then(cmpClient => doTheJob({cmpClient}))
  })
})

const doTheJob = ({cmpClient}) => {
  return (
    cmpClient
      .getConsentStatus()
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
          // after editing the consents, the client should save the vendor consents
          cmpClient
            .setVendorConsents(sampleVendorConsentsEditedInAnUI)
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
  )
}

const filterConsentStatus = (consentStatus, status) => {
  if (consentStatus !== status) {
    throw new Error(
      'Consent Status should be: ' + status + ' actual:' + consentStatus
    )
  }
  return consentStatus
}
const sampleVendorConsentsEditedInAnUI = {
  purposeConsents: {'1': true, '2': true, '3': true, '4': true},
  vendorConsents: {
    '1': true,
    '2': true,
    '3': true,
    '6': true,
    '7': true,
    '8': true
  }
}
const checkEncodedConsent = ({
  encodedConsent,
  acceptedConsents,
  globalVendorList
}) => {
  const consent = new ConsentString(encodedConsent)

  // the allowed purposes into the encoded consent should be the edited purposes in the UI
  globalVendorList.purposes.map(p => p.id).forEach(id => {
    if (acceptedConsents.purposeConsents[id] && !consent.isPurposeAllowed(id)) {
      console.log(consent.isPurposeAllowed(id))
      throw new Error(`Purpose ${id} should be allowed`)
    } else if (
      !acceptedConsents.purposeConsents[id] &&
      consent.isPurposeAllowed(id)
    ) {
      throw new Error(`Purpose ${id} should not be allowed`)
    }
  })

  // the allowed vendors into the encoded consent should be the edited vendors in the UI
  globalVendorList.vendors.map(v => v.id).forEach(id => {
    if (acceptedConsents.vendorConsents[id] && !consent.isVendorAllowed(id)) {
      throw new Error(`Vendor ${id} should be allowed`)
    } else if (
      !acceptedConsents.vendorConsents[id] &&
      consent.isVendorAllowed(id)
    ) {
      throw new Error(`Vendor ${id} should not be allowed`)
    }
  })
}
