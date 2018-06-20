/* eslint-disable prettier/prettier */
import GetConsentDataUseCase from '../../../src/cmp/application/GetConsentDataUseCase'
import sinon from 'sinon'
import {expect} from 'chai'
import VendorConsentData from '../../../src/cmp/domain/VendorConsentData'

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

      getConsentDataUseCase
        .getConsentData()
        .then(result => {
          expect(getConsentDataRepositorySpy.calledOnce, 'getConsentData should be called once').to.be.true
          expect(result).to.be.an.instanceOf(VendorConsentData)
          expect(result.consentData, 'Value does not match with the expected.').equal(givenConsentData)
          expect(result.hasGlobalScope, 'Value does not match with the expected.').equal(givenHasGlobalScope)
          expect(result.gdprApplies, 'Value does not match with the expected.').equal(givenGdprApplies)
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
})
