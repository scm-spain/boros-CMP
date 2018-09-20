import GlobalStorageBootstrap from '../../../../cmp/infrastructure/bootstrap/GlobalStorageBootstrap'
import {JSDOM} from 'jsdom'
import {expect} from 'chai'

describe('GlobalStorageBootstrap Test', () => {
  describe('Given a Windows and a Configuration', () => {
    it('Should return promise when calling init method', done => {
      const givenWindow = new JSDOM(
        '<!DOCTYPE html><div id="forlayo">I\'m BATMAN!</div>'
      ).window
      const givenConfig = {
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

      const initPromise = GlobalStorageBootstrap.init({
        window: givenWindow,
        config: givenConfig
      })

      expect(initPromise).instanceOf(Promise)
      done()
    })
  })
})
