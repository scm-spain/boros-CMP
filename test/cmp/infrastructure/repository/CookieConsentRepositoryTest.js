/* eslint-disable prettier/prettier */
import {expect} from 'chai'
import CookieConsentRepository from '../../../../src/cmp/infrastructure/repository/CookieConsentRepository'

describe('CookieConsentRepository test', () => {
  describe('getConsentData method', () => {
    it('Should return the consent data from vendor cookie', done => {
      const expectedEuconsent = 'BOPVloMOPi60FABABAENBA-AAAAcF7_______9______9uz_Gv_r_f__33e8_39v_h_7_-___m_-3zV4-_lvR11yPA1OrfIrwFhiAwAA'
      const givenCookieValue = 'pubconsent=BOPVloMOPVqFzABABAENA8AB-AAAE8A; euconsent=' + expectedEuconsent
      const documentMock = {
        cookie: givenCookieValue
      }

      const repository = new CookieConsentRepository({
        dom: documentMock
      })

      repository.getConsentData()
        .then(result => {
          expect(result, 'result should be the expected consent data from the cookie').to.deep.equal(expectedEuconsent)
         })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should return undefined when the cookie is empty', done => {
      const documentMock = {
        cookie: ""
      }

      const repository = new CookieConsentRepository({
        dom: documentMock
      })

      repository.getConsentData()
        .then(result => {
          expect(result, 'result should be the expected consent data from the cookie').to.deep.equal(undefined)
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
})
