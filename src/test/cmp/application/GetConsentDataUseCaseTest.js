import GetConsentDataUseCase from '../../../cmp/application/services/consent/GetConsentDataUseCase'
import sinon from 'sinon'
import {expect} from 'chai'

describe('GetConsentDataUseCase', () => {
  describe('getConsentData', () => {
    it('Should return the stored consent string', done => {
      const givenGdprApplies = true
      const givenHasGlobalScope = false
      const givenConsentString = 'whatever'
      const givenConsent = {
        getConsentString: () => givenConsentString
      }
      const consentRepositoryMock = {
        getConsent: () => Promise.resolve(givenConsent)
      }
      const getConsentSpy = sinon.spy(consentRepositoryMock, 'getConsent')

      const getConsentDataUseCase = new GetConsentDataUseCase({
        consentRepository: consentRepositoryMock,
        gdprApplies: givenGdprApplies,
        hasGlobalScope: givenHasGlobalScope
      })

      getConsentDataUseCase
        .getConsentData()
        .then(result => {
          expect(
            getConsentSpy.calledOnce,
            'should have retrieved the consent from the repository'
          ).to.be.true
          expect(
            result.consentData,
            'Value does not match with the expected.'
          ).equal(givenConsentString)
          expect(
            result.hasGlobalScope,
            'Value does not match with the expected.'
          ).equal(givenHasGlobalScope)
          expect(
            result.gdprApplies,
            'Value does not match with the expected.'
          ).equal(givenGdprApplies)
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
})
