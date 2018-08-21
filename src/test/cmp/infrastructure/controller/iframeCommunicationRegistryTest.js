import {expect} from 'chai'
import {JSDOM} from 'jsdom'
import IframeCommunication from '../../../../cmp/infrastructure/controller/IframeCommunication'
import fixJsdomPostMessageWithEventSource from './fixJSDOMPostMessage'

describe('registerIframeCommunication', () => {
  describe('Given a cmp instance and a window object', () => {
    it('Should register a window listener to consume post messages from iframe and delegate them to the cmp', done => {
      const givenWindow = new JSDOM('<!DOCTYPE html><div>Hello world</div>')
        .window
      fixJsdomPostMessageWithEventSource({
        origin: givenWindow,
        target: givenWindow
      })

      const givenCommand = 'test'
      const givenParameter = {what: 'ever'}
      const givenCallId = 3

      const givenCmpResult = {
        a: 'result'
      }
      const givenCmpSuccess = true

      givenWindow.addEventListener('message', event => {
        try {
          if (event && event.data && event.data.__cmpReturn) {
            const cmpReturn = event.data.__cmpReturn
            expect(
              cmpReturn.returnValue,
              'return value should be the returned by the cmp observer callback'
            ).to.deep.equal(givenCmpResult)
            expect(
              cmpReturn.success,
              'success value should be the returned by the cmp observer callback'
            ).to.deep.equal(givenCmpSuccess)
            expect(
              cmpReturn.callId,
              'callId value should be the same callId sent from the initial postMessage caller'
            ).to.deep.equal(givenCallId)

            done()
          }
        } catch (e) {
          done(e)
        }
      })

      const cmpMock = (command, parameter, observer) => {
        try {
          expect(
            command,
            'command should be the command received in the __cmpCall'
          ).to.equal(givenCommand)
          expect(
            parameter,
            'the parameter should be the received in the __cmpCall'
          ).to.deep.equal(givenParameter)
          observer(givenCmpResult, givenCmpSuccess)
        } catch (e) {
          done(e)
        }
      }

      givenWindow.__cmp = cmpMock

      Promise.resolve()
        .then(() =>
          new IframeCommunication({
            window: givenWindow
          }).register()
        )
        .then(() => {
          givenWindow.postMessage(
            {
              __cmpCall: {
                command: givenCommand,
                parameter: givenParameter,
                callId: givenCallId
              }
            },
            '*'
          )
        })
    })
  })
})
