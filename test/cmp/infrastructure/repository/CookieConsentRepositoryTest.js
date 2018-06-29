import {expect} from 'chai'
import sinon from 'sinon'
import CookieConsentRepository from '../../../../src/cmp/infrastructure/repository/CookieConsentRepository'
import IABConsentFactory from '../../../../src/cmp/infrastructure/factory/IABConsentFactory'

describe('CookieConsentRepositoryTest', () => {
  describe('getConsent', () => {
    it('Should return undefined if there is no stored value into euconsent cookie', done => {
      const givenCookieValue =
        'somecookie=BOPVloMOPVqFzABABAENA8AB-AAAE8A;anothercookie=BOPVloMOPVqFzABABAENA8AB-AAAE8A'
      const documentMock = {
        cookie: givenCookieValue
      }
      const vendorListRepositoryMock = {
        getGlobalVendorList: sinon.spy()
      }
      const consentFactoryMock = {}

      const repository = new CookieConsentRepository({
        dom: documentMock,
        consentFactory: consentFactoryMock,
        vendorListRepository: vendorListRepositoryMock
      })

      repository
        .getConsent()
        .then(consent => {
          expect(
            consent,
            'there should be consent defined if there is no cookie'
          ).to.be.undefined
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should return the ConsentString restored from the cookie which consent string is the cookie value', done => {
      const givenAllowedVendorIds = [1]
      const givenGlobalVendorList = require('./../../resources/globalvendorlist.json')
      const givenEuConsent =
        'BOPmXwlOQETrjABABAESBK-AAAAcd7vf____79n_____9uz_Gv_rvf__33e8_39v_h_r_-___mf-3zV4-91vV11yPg1urXIr1FpjQ6MGgA'
      const givenCookieValue =
        'pubconsent=BOPVloMOPVqFzABABAENA8AB-AAAE8A; euconsent=' +
        givenEuConsent
      const documentMock = {
        cookie: givenCookieValue
      }
      const vendorListRepositoryMock = {
        getGlobalVendorList: () => givenGlobalVendorList
      }

      const consentFactory = new IABConsentFactory()

      const repository = new CookieConsentRepository({
        dom: documentMock,
        consentFactory: consentFactory,
        vendorListRepository: vendorListRepositoryMock
      })

      repository
        .getConsent({allowedVendorIds: givenAllowedVendorIds})
        .then(consent => {
          expect(
            consent.getConsentString(false),
            'the consent string should be the same as the read one from the cookie'
          ).to.equal(givenEuConsent)
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
})
