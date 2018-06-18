/* eslint-disable prettier/prettier */
import {expect} from 'chai'
import sinon from 'sinon'
import commandConsumer from '../../../../src/cmp/infrastructure/controller/commandConsumer'

describe('commandConsumer', () => {
  const logMock = () => ({
    debug: () => null,
    error: () => null
  })
  const controllerMock = ({getConsentDataResult = () => null} = {}) => ({
    getConsentData: () => Promise.resolve().then(() => getConsentDataResult())
  })
  describe('Given an executable command', () => {
    it('Should call the valid CMP controller command without errors', done => {
      const log = logMock()
      const controller = controllerMock()
      const getConsentDataSpy = sinon.spy(controller, 'getConsentData')
      const parameters = {
        key: 'value'
      }
      const observer = () => null
      const __cmp = commandConsumer(log)(controller)

      __cmp('getConsentData', parameters, observer)
          .then(() => expect(getConsentDataSpy.calledOnce, 'CMP method shoud be called').to.be.true)
          .then(() => expect(getConsentDataSpy.args[0][0], 'CMP call should recieve the parameters').to.deep.equals(parameters))
          .then(() => expect(getConsentDataSpy.args[0][1], 'CMP call should recieve the callback').to.equals(observer))
          .then(() => done())
          .catch(e => done(e))
    })
  })
    describe('Given an inexisting command', () => {
        it('Should log an error', done => {
            const log = logMock()
            const controller = controllerMock()
            const parameters = 'whatever'
            const observer = () => 'whatever'
            const logErrorSpy = sinon.spy(log, 'error')
            commandConsumer(log)(controller)('whatever', parameters, observer)
                .then(() => expect(logErrorSpy.calledOnce, 'Should have logged the error').to.be.true)
                .then(() => expect(logErrorSpy.args[0].join(), 'The error should indicate that the command does not exist').to.include('Unexisting command'))
                .then(() => done())
                .catch(e => done(e))
        })
    })
})
