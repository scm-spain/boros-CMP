import {expect} from 'chai'
import GlobalVendorList from '../../../resources/globalvendorlist.json'
import GlobalVendorListV75 from '../../../resources/globalvendorlist.75.json'
import ConsentFactory from '../../../../cmp/domain/consent/ConsentFactory'
import DomainEventBus from '../../../../cmp/domain/event_bus/DomainEventBus'
import {OBSOLETE_VENDORS_LIST_VERSION} from '../../../../cmp/domain/consent/obsoleteVendorsListVersion'

describe('ConsentFactory', () => {
  describe('createConsent', () => {
    it('Should return a ConsentString with a globalVendorList', done => {
      const givenGlobalVendorList = GlobalVendorList
      const givenConsentStringData =
        'BOPmXwlOQETrjABABAESBK-AAAAcd7vf____79n_____9uz_Gv_rvf__33e8_39v_h_r_-___mf-3zV4-91vV11yPg1urXIr1FpjQ6MGgA'
      const factory = new ConsentFactory()
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
    it('Should notify that a consent is registered with an obsolete global vendor list version', done => {
      const givenGlobalVendorList = GlobalVendorListV75
      const givenAllowedVendorIds = [1]
      const givenConsentStringData =
        'BOPmXwlOQETrjABABAESBK-AAAAcd7vf____79n_____9uz_Gv_rvf__33e8_39v_h_r_-___mf-3zV4-91vV11yPg1urXIr1FpjQ6MGgA'
      DomainEventBus.clearAllObservers()

      const factory = new ConsentFactory({
        allowedVendorIds: givenAllowedVendorIds
      })

      DomainEventBus.register({
        eventName: OBSOLETE_VENDORS_LIST_VERSION,
        observer: ({payload}) => {
          Promise.resolve()
            .then(() => {
              expect(
                payload.purposeConsents,
                'the payload should have the accepted purposes'
              ).to.be.a('array')
              expect(
                payload.vendorConsents,
                'the payload should have the accepted vendors'
              ).to.be.a('array')
              expect(
                payload.oldVendorListVersion,
                'the payload should have the obsolete vendor list version number (74)'
              ).to.equal(74)
              expect(
                payload.newGlobalVendorList,
                'the payload should have the new global vendor list to use'
              ).to.not.undefined
              expect(
                payload.allowedVendorIds,
                'the payload should have whitelisted accepted vendor ids'
              ).to.be.a('array')
              done()
            })
            .catch(e => done(e))
        }
      })

      factory
        .createConsent({
          encodedConsent: givenConsentStringData,
          globalVendorList: givenGlobalVendorList
        })
        .catch(e => done(e))
    })
  })
})
