/* eslint-disable prettier/prettier */
import {expect} from 'chai'
import sinon from 'sinon'
import commandConsumer from '../../../src/cmp/infrastructure/commandConsumer'

describe('commandConsumer', () => {
  const logMock = () => ({
    debug: () => null,
    error: () => null
  })
  const cmpMock = ({getConsentDataResult = () => null} = {}) => ({
    getConsentData: () => Promise.resolve().then(() => getConsentDataResult())
  })
  describe('Given an executable command', () => {
    it('Should call the valid CMP command and end with a callback  if command runs without errors', done => {
      const resultData = [{key: 'value'}, true]
      const log = logMock()
      const cmp = cmpMock({getConsentDataResult: () => resultData})
      const getConsentDataSpy = sinon.spy(cmp, 'getConsentData')
      const parameters = {
        key: 'value'
      }
      const callbackMock = sinon.spy()
      commandConsumer(log)(cmp)('getConsentData', parameters, callbackMock)
          .then(() => expect(getConsentDataSpy.calledOnce, 'CMP method shoud be called').to.be.true)
          .then(() => expect(getConsentDataSpy.args[0][0], 'CMP call should recieve the parameters').to.deep.equals(parameters))
          .then(() => expect([callbackMock.args[0][0], callbackMock.args[0][1]], 'CMP call should call the callback with object and success value').to.deep.equals([resultData[0], resultData[1]]))
          .then(() => done())
          .catch(e => done(e))
    })
  })
    describe('Given an inexisting command', () => {
        it('Should log an error', done => {
            const log = logMock()
            const cmp = cmpMock()
            const parameters = 'whatever'
            const observer = () => 'whatever'
            const logErrorSpy = sinon.spy(log, 'error')
            commandConsumer(log)(cmp)('whatever', parameters, observer)
                .then(() => expect(logErrorSpy.calledOnce, 'Should have logged the error').to.be.true)
                .then(() => expect(logErrorSpy.args[0].join(), 'The error should indicate that the command does not exist').to.include('Unexisting command'))
                .then(() => done())
                .catch(e => done(e))
        })
    })
})
