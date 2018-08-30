import {expect} from 'chai'
import CookieConsentRepository from '../../../../cmp/infrastructure/repository/CookieConsentRepository'
import CookieHandler from '../../../../cmp/infrastructure/service/CookieHandler'
import {JSDOM} from 'jsdom'

describe('CookieConsentRepositoryTest', () => {
  describe('getConsent', () => {
    it('Should return undefined if there is no stored value into euconsent cookie', done => {
      const givenCookieValue =
        'somecookie=BOPVloMOPVqFzABABAENA8AB-AAAE8A;anothercookie=BOPVloMOPVqFzABABAENA8AB-AAAE8A'
      const documentMock = {
        cookie: givenCookieValue
      }
      const cookieHandler = new CookieHandler({
        dom: documentMock
      })
      const consentFactoryMock = {
        createConsent: () => Promise.resolve({})
      }

      const repository = new CookieConsentRepository({
        cookieHandler: cookieHandler,
        consentFactory: consentFactoryMock
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
      const givenEuConsent =
        'BOPmXwlOQETrjABABAESBK-AAAAcd7vf____79n_____9uz_Gv_rvf__33e8_39v_h_r_-___mf-3zV4-91vV11yPg1urXIr1FpjQ6MGgA'
      const givenCookieValue =
        'pubconsent=BOPVloMOPVqFzABABAENA8AB-AAAE8A; euconsent=' +
        givenEuConsent
      const documentMock = {
        cookie: givenCookieValue
      }

      const cookieHandler = new CookieHandler({
        dom: documentMock
      })

      const consentFactoryMock = {
        createConsent: () =>
          Promise.resolve({
            getConsentString: () => givenEuConsent
          })
      }

      const repository = new CookieConsentRepository({
        cookieHandler: cookieHandler,
        consentFactory: consentFactoryMock
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
  describe('saveConsent', () => {
    it('Should return true after cookie consent has been stored', done => {
      const givenEuConsent =
        'BOPmXwlOQETrjABABAESBK-AAAAcd7vf____79n_____9uz_Gv_rvf__33e8_39v_h_r_-___mf-3zV4-91vV11yPg1urXIr1FpjQ6MGgA'
      const givenDOM = new JSDOM(
        '<!DOCTYPE html><div id="fear">I\'m BATMAN!</div>'
      ).window.document

      const cookieHandler = new CookieHandler({
        dom: givenDOM
      })

      const consentMock = {
        getConsentString: () => givenEuConsent
      }

      const consentFactoryMock = {
        createConsent: () =>
          Promise.resolve({
            getConsentString: () => givenEuConsent
          })
      }

      const repository = new CookieConsentRepository({
        cookieHandler: cookieHandler,
        consentFactory: consentFactoryMock
      })

      const expectedCookieValue =
        'euconsent=BOPmXwlOQETrjABABAESBK-AAAAcd7vf____79n_____9uz_Gv_rvf__33e8_39v_h_r_-___mf-3zV4-91vV11yPg1urXIr1FpjQ6MGgA'

      repository
        .saveConsent({
          consent: consentMock
        })
        .then(data => {
          expect(data).to.be.true
          expect(givenDOM.cookie).to.equal(expectedCookieValue)
          done()
        })

        .catch(e => done(new Error(e)))
    })
  })
})
