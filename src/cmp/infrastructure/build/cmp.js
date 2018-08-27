/* eslint-disable no-undef */
import '../event-polyfill'
import Bootstrap from '../bootstrap'
Bootstrap.context({
  window,
  config: {
    consent: {
      cmpId: 42,
      cmpVersion: '1',
      consentScreen: 1,
      consentLanguage: 'es'
    },
    gdpr: {
      gdprApplies: true,
      storeConsentGlobally: false
    }
  }
})
