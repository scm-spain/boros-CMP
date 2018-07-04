import {expect} from 'chai'
import GlobalVendorList from '../../../resources/globalvendorlist.json'
import IABConsentFactory from '../../../../src/cmp/infrastructure/factory/IABConsentFactory'

describe('IABConsentFactory', () => {
  describe('createConsent', () => {
    it('Should return a ConsentString with a globalVendorList', done => {
      const givenGlobalVendorList = GlobalVendorList
      const givenConsentStringData =
        'BOPmXwlOQETrjABABAESBK-AAAAcd7vf____79n_____9uz_Gv_rvf__33e8_39v_h_r_-___mf-3zV4-91vV11yPg1urXIr1FpjQ6MGgA'
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
          ).to.equal(74)
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
