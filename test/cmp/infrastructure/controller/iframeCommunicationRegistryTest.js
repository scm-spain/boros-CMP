import {expect} from 'chai'
import {JSDOM} from 'jsdom'
import registerIframeCommunication from '../../../../src/cmp/infrastructure/controller/iframeCommunicationRegistry'

const fixJsdomPostMessageWithEventSource = window => {
  window.postMessage = (message) => {
    const event = new window.MessageEvent('message', {
      data: message,
      source: window
    })
    event.initEvent('message', false, false)
    setTimeout(() => {
      window.dispatchEvent(event)
    }, 0)
  }
}

describe('registerIframeCommunication', () => {
  describe('Given a cmp instance and a window object', () => {
    it('Should register a window listener to consume post messages from iframe and delegate them to the cmp', done => {
      const givenWindow = new JSDOM('<!DOCTYPE html><div>Hello world</div>')
        .window
      fixJsdomPostMessageWithEventSource(givenWindow)

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

      Promise.resolve()
        .then(() =>
          registerIframeCommunication({
            window: givenWindow,
            cmp: cmpMock
          })
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
          setTimeout(() => done(new Error('should call the cmp function')), 200)
        })
    })
  })
})
