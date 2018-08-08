import {expect} from 'chai'
import sinon from 'sinon'
import commandConsumer from '../../../../src/cmp/application/services/commandConsumer'

describe('commandConsumer', () => {
  const createLogMock = () => ({
    debug: () => null,
    error: () => null
  })
  describe('Given an executable command', () => {
    it('Should call the valid CMP controller command without errors and call the observer with success value and result value', done => {
      const logMock = createLogMock()
      const expectedResultValue = 'result value'
      const controllerMock = {
        anyIABmethod: () => Promise.resolve(expectedResultValue)
      }
      const methodSpy = sinon.spy(controllerMock, 'anyIABmethod')
      const parameters = {
        key: 'value'
      }
      const __cmp = commandConsumer(logMock)(controllerMock)

      const observer = (result, success) => {
        Promise.resolve()
          .then(() => {
            expect(
              result,
              'received result should be the expected result'
            ).to.equal(result)
            expect(success, 'success value should be true').to.be.true
            expect(methodSpy.calledOnce, 'CMP method shoud be called').to.be
              .true
            expect(
              methodSpy.args[0][0],
              'CMP call should recieve the parameters'
            ).to.deep.equals(parameters)
            done()
          })
          .catch(e => done(e))
      }
      __cmp('anyIABmethod', parameters, observer).catch(e => done(e))
    })
  })
  describe('Given an inexisting command', () => {
    it('Should log an error', done => {
      const logMock = createLogMock()
      const controllerMock = {}
      const parameters = 'whatever'
      const observer = () => 'whatever'
      const logErrorSpy = sinon.spy(logMock, 'error')
      commandConsumer(logMock)(controllerMock)('whatever', parameters, observer)
        .then(result => {
          expect(result, 'output value should be false when an error occurs').to
            .be.false
          expect(logErrorSpy.calledOnce, 'Should have logged the error').to.be
            .true
          expect(
            logErrorSpy.args[0].join(),
            'The error should indicate that the command does not exist'
          ).to.include('Unexisting command')
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
  describe('Given a valid command without an observer', () => {
    it('Should send a default observer to the controller to be used as command callback', done => {
      const logMock = createLogMock()
      const controllerMock = {
        test: (parameters, observer) =>
          Promise.resolve().then(() => {
            expect(
              typeof observer,
              'the received observer should be a default function'
            ).to.equal('function')
          })
      }

      commandConsumer(logMock)(controllerMock)('test')
        .then(result => {
          expect(result, 'should end with a true value').to.be.true
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
})
