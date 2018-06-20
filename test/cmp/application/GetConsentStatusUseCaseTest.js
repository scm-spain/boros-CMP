/* eslint-disable prettier/prettier */
import {expect} from 'chai'
import GetConsentStatusUseCase from '../../../src/cmp/application/GetConsentStatusUseCase'

describe('GetConsentStatusUseCase test', () => {
  describe('getConsentStatus method', () => {
    it('Should return ACCEPTED if the cookie exists', done => {
      const expectedResult = 'ACCEPTED'
      const givenConsentData = 'BOPVloMOPi60FABABAENBA-AAAAcF7_______9______9uz_Gv_r_f__33e8_39v_h_7_-___m_-3zV4-_lvR11yPA1OrfIrwFhiAwAA'
      const consentRepositoryMock = {
        getConsentData: () => Promise.resolve(givenConsentData)
      }
      const getConsentStatusUseCase = new GetConsentStatusUseCase({consentRepository: consentRepositoryMock})

      getConsentStatusUseCase.getConsentStatus()
        .then(result =>{
          expect(result, 'Value does not match with the expected.').equal(expectedResult)
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should return NON_ACCEPTED if the cookie does not exists', done => {
      const expectedResult = 'NOT_ACCEPTED'
      const givenConsentData = undefined
      const consentRepositoryMock = {
        getConsentData: () => Promise.resolve(givenConsentData)
      }
      const getConsentStatusUseCase = new GetConsentStatusUseCase({consentRepository: consentRepositoryMock})
      getConsentStatusUseCase.getConsentStatus()
        .then(result =>{
          expect(result, 'Value does not match with the expected.').equal(expectedResult)
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
})
