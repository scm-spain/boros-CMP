import {JSDOM} from 'jsdom'
import CMPFacade from './application/CMPFacade'
import TestBootstrap from '../cmp/infrastructure/bootstrap/TestBootstrap'

const initializeTestClientCMP = () => {
  return TestBootstrap.init({
    window: new JSDOM('<!DOCTYPE html><div id="forlayo">I\'m BATMAN!</div>')
      .window,
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

export default initializeTestClientCMP
