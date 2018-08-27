import {expect} from 'chai'
import Configuration from '../../../../cmp/infrastructure/configuration/Configuration'
import {
  DEFAULT_CONSENT_LANGUAGE,
  DEFAULT_CONSENT_SCREEN,
  DEFAULT_GDPR_APPLIES,
  DEFAULT_GDPR_STORE_CONSENT_GLOBALLY,
  DEFAULT_LOG_LEVEL
} from '../../../../cmp/infrastructure/configuration/defaults'
import {
  CMP_ID,
  CMP_VERSION
} from '../../../../cmp/infrastructure/configuration/internals'
import {
  latestVendorListLocator,
  versionVendorListLocator
} from '../../../../cmp/domain/vendor_list/iabVendorListLocator'
import {
  OPTION_ALL_ALLOW,
  OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE
} from '../../../../cmp/domain/vendor_consents/NewVendorsStatusFactory'

describe('Configuration', () => {
  describe('given an empty configuration objects', () => {
    it('Should be initialized with default values', () => {
      const configuration = new Configuration()
      const expectedConfiguration = {
        gdpr: {
          gdprApplies: DEFAULT_GDPR_APPLIES,
          globalConsentLocation: undefined,
          storeConsentGlobally: DEFAULT_GDPR_STORE_CONSENT_GLOBALLY
        },
        consent: {
          cmpId: CMP_ID,
          cmpVersion: CMP_VERSION,
          consentScreen: DEFAULT_CONSENT_SCREEN,
          consentLanguage: DEFAULT_CONSENT_LANGUAGE,
          allowedVendorIds: undefined,
          newVendorsStatusOption: OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE
        },
        httpVendorList: {
          latestLocator: latestVendorListLocator,
          versionLocator: versionVendorListLocator
        },
        log: {
          level: DEFAULT_LOG_LEVEL
        }
      }
      expect(
        configuration.gdpr,
        'gdpr should have been initialized with default values'
      ).to.deep.equal(expectedConfiguration.gdpr)
      expect(
        configuration.consent,
        'consent should have been initialized with default values'
      ).to.deep.equal(expectedConfiguration.consent)
      expect(
        configuration.httpVendorList,
        'httpVendorList should have been initialized with default values'
      ).to.deep.equal(expectedConfiguration.httpVendorList)
      expect(
        configuration.log,
        'log should have been initialized with default values'
      ).to.deep.equal(expectedConfiguration.log)
    })
  })
  describe('given configuration objects', () => {
    it('Should be initialized with the received values', () => {
      const givenGdpr = {
        gdprApplies: true,
        globalConsentLocation: 'https://what.ever.com/iframe.html',
        storeConsentGlobally: true
      }
      const givenConsent = {
        consentScreen: 3,
        consentLanguage: 'es',
        allowedVendorIds: [1],
        newVendorsStatusOption: OPTION_ALL_ALLOW
      }
      const givenHttpVendorList = {
        latestLocator: () => '',
        versionLocator: () => ''
      }
      const givenLog = {
        level: DEFAULT_LOG_LEVEL
      }
      const configuration = new Configuration({
        gdpr: givenGdpr,
        consent: givenConsent,
        httpVendorList: givenHttpVendorList,
        log: givenLog
      })
      const expectedConfiguration = {
        gdpr: givenGdpr,
        consent: {
          cmpId: CMP_ID,
          cmpVersion: CMP_VERSION,
          consentScreen: givenConsent.consentScreen,
          consentLanguage: givenConsent.consentLanguage,
          allowedVendorIds: givenConsent.allowedVendorIds,
          newVendorsStatusOption: givenConsent.newVendorsStatusOption
        },
        httpVendorList: givenHttpVendorList,
        log: givenLog
      }
      expect(
        configuration.gdpr,
        'gdpr should have been initialized with received values'
      ).to.deep.equal(expectedConfiguration.gdpr)
      expect(
        configuration.consent,
        'consent should have been initialized with received values'
      ).to.deep.equal(expectedConfiguration.consent)
      expect(
        configuration.httpVendorList,
        'httpVendorList should have been initialized with received values'
      ).to.deep.equal(expectedConfiguration.httpVendorList)
      expect(
        configuration.log,
        'log should have been initialized with received values'
      ).to.deep.equal(expectedConfiguration.log)
    })
    it('Should fill missing values with defaults', () => {
      const givenGdpr = {
        storeConsentGlobally: true,
        globalConsentLocation: 'https://what.ever.com/iframe.html'
      }
      const givenConsent = {
        consentLanguage: 'es'
      }
      const configuration = new Configuration({
        gdpr: givenGdpr,
        consent: givenConsent
      })
      const expectedConfiguration = {
        gdpr: {
          gdprApplies: DEFAULT_GDPR_APPLIES,
          globalConsentLocation: 'https://what.ever.com/iframe.html',
          storeConsentGlobally: givenGdpr.storeConsentGlobally
        },
        consent: {
          cmpId: CMP_ID,
          cmpVersion: CMP_VERSION,
          consentScreen: DEFAULT_CONSENT_SCREEN,
          consentLanguage: givenConsent.consentLanguage,
          allowedVendorIds: undefined,
          newVendorsStatusOption: OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE
        },
        httpVendorList: {
          latestLocator: latestVendorListLocator,
          versionLocator: versionVendorListLocator
        },
        log: {
          level: DEFAULT_LOG_LEVEL
        }
      }
      expect(
        configuration.gdpr,
        'gdpr should have been filled with default values'
      ).to.deep.equal(expectedConfiguration.gdpr)
      expect(
        configuration.consent,
        'consent should have been filled with default values'
      ).to.deep.equal(expectedConfiguration.consent)
      expect(
        configuration.httpVendorList,
        'httpVendorList should have been filled with default values'
      ).to.deep.equal(expectedConfiguration.httpVendorList)
      expect(
        configuration.log,
        'log should have been filled with default values'
      ).to.deep.equal(expectedConfiguration.log)
    })
  })
})
