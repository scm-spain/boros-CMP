import {JSDOM} from 'jsdom'
import CMPFacade from './application/CMPFacade'
import TestLocalStoreBootstrap from '../cmp/infrastructure/bootstrap/TestLocalStoreBootstrap'
import TestGlobalStoreBootstrap from '../cmp/infrastructure/bootstrap/TestGlobalStoreBootstrap'

const initializeLocalStoreTestClientCMP = () => {
  const windowMock = new JSDOM(
    '<!DOCTYPE html><div id="forlayo">I\'m BATMAN!</div>'
  ).window

  return TestLocalStoreBootstrap.init({
    window: windowMock,
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
  }).then(cmp => new CMPFacade({cmp}))
}

const initializeGlobalStoreTestClientCMP = () => {
  const windowMock = new JSDOM(
    '<!DOCTYPE html><div id="forlayo">I\'m BATMAN!</div>'
  ).window

  return TestGlobalStoreBootstrap.init({
    window: windowMock,
    config: {
      consent: {
        cmpId: 42,
        cmpVersion: '1',
        consentScreen: 1,
        consentLanguage: 'es'
      },
      gdpr: {
        gdprApplies: true,
        storeConsentGlobally: true,
        globalConsentLocation: 'somewhere.html'
      }
    }
  }).then(cmp => new CMPFacade({cmp}))
}
export {initializeLocalStoreTestClientCMP, initializeGlobalStoreTestClientCMP}
