/* eslint-disable prettier/prettier */
import GetConsentDataUseCase from '../../../src/cmp/application/GetConsentDataUseCase'
import sinon from 'sinon'
import {expect} from 'chai'

describe('GetConsentDataUseCase test', () => {
  describe('getConsentData method', () => {
    it('Should return the consent data', done => {
      const expectedConsentData = '{ "1" : true }'
      const consentRepositoryMock = {
        getConsentData: () => Promise.resolve(expectedConsentData)
      }
      const getConsentDataRepositorySpy = sinon.spy(
        consentRepositoryMock,
        'getConsentData'
      )

      const getConsentDataUseCase = new GetConsentDataUseCase({
        consentRepository: consentRepositoryMock
      })

      getConsentDataUseCase
        .getConsentData()
        .then(result => {
          expect(getConsentDataRepositorySpy.calledOnce, 'getConsentData should be called once').to.be.true
          expect(result, 'result should be the expected consent data returned by the repository').to.deep.equal(expectedConsentData)
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
})
