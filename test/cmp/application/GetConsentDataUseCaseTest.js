/* eslint-disable prettier/prettier */
import GetConsentDataUseCase from '../../../src/cmp/application/GetConsentDataUseCase'
import sinon from 'sinon'
import {expect} from 'chai'

describe('GetConsentDataUseCase test', () => {
  describe('getConsentData method', () => {
    it('Should return the consent data', done => {
      const givenGdprApplies = true
      const givenHasGlobalScope = false
      const givenConsentData = '{ "1" : true }'
      const consentRepositoryMock = {
        getConsentData: () => Promise.resolve(givenConsentData)
      }
      const getConsentDataRepositorySpy = sinon.spy(
        consentRepositoryMock,
        'getConsentData'
      )

      const getConsentDataUseCase = new GetConsentDataUseCase({
        consentRepository: consentRepositoryMock,
        gdprApplies: givenGdprApplies,
        hasGlobalScope: givenHasGlobalScope
      })

      const expectedResult = {
        gdprApplies: givenGdprApplies,
        hasGlobalScope: givenHasGlobalScope,
        consentData: givenConsentData
      }

      getConsentDataUseCase
        .getConsentData()
        .then(result => {
          expect(getConsentDataRepositorySpy.calledOnce, 'getConsentData should be called once').to.be.true
          expect(result, 'expected result does not match with the current result.').to.deep.equal(expectedResult)
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
})
