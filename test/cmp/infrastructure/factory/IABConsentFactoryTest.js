import {expect} from 'chai'
import IABConsentFactory from '../../../../src/cmp/infrastructure/factory/IABConsentFactory'

describe('IABConsentFactory', () => {
  describe('createConsent', () => {
    it('Should return a ConsentString with a globalVendorList', done => {
      const givenGlobalVendorList = require('./../../resources/globalvendorlist.json')
      const givenConsentStringData =
        'BOPVloMOPi60FABABAENBA-AAAAcF7_______9______9uz_Gv_r_f__33e8_39v_h_7_-___m_-3zV4-_lvR11yPA1OrfIrwFhiAwAA'
      const factory = new IABConsentFactory()
      factory
        .createConsent({
          encodedConsent: givenConsentStringData,
          globalVendorList: givenGlobalVendorList
        })
        .then(consent => {
          expect(
            consent.getVendorListVersion(),
            'consent has no valid vendor list version'
          ).to.equal(67)
          expect(
            consent.getCmpId(),
            'consent has not parsed the string data'
          ).to.equal(1)
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
})
