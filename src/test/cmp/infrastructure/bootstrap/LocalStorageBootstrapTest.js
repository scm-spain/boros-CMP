import LocalStorageBootstrap from '../../../../cmp/infrastructure/bootstrap/LocalStorageBootstrap'
import {JSDOM} from 'jsdom'
import {expect} from 'chai'

describe('LocalStorageBootstrap Test', () => {
  describe('Given a Windows and a Configuration', () => {
    it('Should return promise when calling init method', () => {
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
          storeConsentGlobally: false
        }
      }

      const initPromise = LocalStorageBootstrap.init({
        window: givenWindow,
        config: givenConfig
      })

      expect(initPromise).instanceOf(Promise)
      return initPromise
    })
  })
})
