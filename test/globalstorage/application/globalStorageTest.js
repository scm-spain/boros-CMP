import {JSDOM} from 'jsdom'
import fixJsdomPostMessageWithEventSource from '../../cmp/infrastructure/controller/fixJSDOMPostMessage'
import {expect} from 'chai'
import globalStorage from '../../../src/globalstorage/application/globalStorage'
import ReadCookieUseCase from '../../../src/globalstorage/application/service/ReadCookieUseCase'
import CookieHandler from '../../../src/cmp/infrastructure/service/CookieHandler'
import WriteCookieUseCase from '../../../src/globalstorage/application/service/WriteCookieUseCase'
import {
  READ_CONSENT_COMMAND,
  WRITE_CONSENT_COMMAND
} from '../../../src/cmp/infrastructure/configuration/iframeConsentCommands'
import {
  VENDOR_CONSENT_COOKIE_DEFAULT_PATH,
  VENDOR_CONSENT_COOKIE_MAX_AGE
} from '../../../src/cmp/infrastructure/configuration/cookie'

describe('globalStorage', () => {
  let givenWindowHost
  let givenWindowIframe

  beforeEach(() => {
    givenWindowHost = new JSDOM('<!DOCTYPE html><div>Hello world</div>').window
    givenWindowIframe = new JSDOM('<!DOCTYPE html><div>Hello world</div>')
      .window
    fixJsdomPostMessageWithEventSource({
      origin: givenWindowHost,
      target: givenWindowIframe
    })
  })

  describe('Given a readCookie command with invalid use case', () => {
    it('Should dispatch an error event with the same callId', done => {
      const givenCommand = 'readCookie'
      const givenParameter = {what: 'ever'}
      const givenCallId = 3
      const expectedCmpSuccess = false

      globalStorage({
        window: givenWindowIframe,
        readCookieUseCase: {},
        writeCookieUseCase: {}
      })
        .then(() => {
          givenWindowHost.addEventListener('message', event => {
            try {
              if (event && event.data && event.data.__cmpReturn) {
                const cmpReturn = event.data.__cmpReturn
                expect(
                  cmpReturn.success,
                  'success value should be the returned by the cmp observer callback'
                ).to.deep.equal(expectedCmpSuccess)
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
        })

        .then(() =>
          givenWindowIframe.postMessage(
            {
              __cmpCall: {
                command: givenCommand,
                parameter: givenParameter,
                callId: givenCallId
              }
            },
            '*'
          )
        )
        .catch(error => done(error))
    })
  })

  describe('Given a readCookie command', () => {
    it('Should dispatch a success response', done => {
      givenWindowIframe.document.cookie = 'euconsent=red'

      const givenCommand = READ_CONSENT_COMMAND
      const givenParameter = {name: 'euconsent'}
      const givenCallId = 3
      const expectedCmpSuccess = true
      const expectedCookieValue = 'red'

      const readCookieUseCaseMock = new ReadCookieUseCase({
        cookieHandler: new CookieHandler({dom: givenWindowIframe.document})
      })

      globalStorage({
        window: givenWindowIframe,
        readCookieUseCase: readCookieUseCaseMock,
        writeCookieUseCase: {}
      })
        .then(() => {
          givenWindowHost.addEventListener('message', event => {
            try {
              if (event && event.data && event.data.__cmpReturn) {
                const cmpReturn = event.data.__cmpReturn
                expect(
                  cmpReturn.success,
                  'success value should be the returned by the cmp observer callback'
                ).to.deep.equal(expectedCmpSuccess)
                expect(
                  cmpReturn.returnValue,
                  'return value should be the returned by the cmp observer callback'
                ).to.deep.equal(expectedCookieValue)
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
        })

        .then(() =>
          givenWindowIframe.postMessage(
            {
              __cmpCall: {
                command: givenCommand,
                parameter: givenParameter,
                callId: givenCallId
              }
            },
            '*'
          )
        )
        .catch(error => done(error))
    })
  })

  describe('Given a writeCookie command with invalid use case', () => {
    it('Should dispatch an error event with the same callId', done => {
      const givenCommand = WRITE_CONSENT_COMMAND
      const givenParameter = {
        name: '',
        value: '',
        path: '',
        maxAgeSeconds: 3600
      }
      const givenCallId = 3
      const expectedCmpSuccess = false

      globalStorage({
        window: givenWindowIframe,
        readCookieUseCase: {},
        writeCookieUseCase: {}
      })
        .then(() => {
          givenWindowHost.addEventListener('message', event => {
            try {
              if (event && event.data && event.data.__cmpReturn) {
                const cmpReturn = event.data.__cmpReturn
                expect(
                  cmpReturn.success,
                  'success value should be the returned by the cmp observer callback'
                ).to.deep.equal(expectedCmpSuccess)
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
        })

        .then(() =>
          givenWindowIframe.postMessage(
            {
              __cmpCall: {
                command: givenCommand,
                parameter: givenParameter,
                callId: givenCallId
              }
            },
            '*'
          )
        )
        .catch(error => done(error))
    })
  })

  describe('Given a valid writeCookie command', () => {
    it('Should dispatch a success event with the same callId', done => {
      const givenCommand = WRITE_CONSENT_COMMAND
      const givenParameter = {
        value: 'Kill!'
      }
      const givenCallId = 3
      const expectedCmpSuccess = true
      const expectedCmpReturnValue = `euconsent=Kill!;path=${VENDOR_CONSENT_COOKIE_DEFAULT_PATH};max-age=${VENDOR_CONSENT_COOKIE_MAX_AGE}`
      const expectedCookieStored = 'euconsent=Kill!'

      const writeCookieUseCaseMock = new WriteCookieUseCase({
        cookieHandler: new CookieHandler({dom: givenWindowIframe.document})
      })

      globalStorage({
        window: givenWindowIframe,
        readCookieUseCase: {},
        writeCookieUseCase: writeCookieUseCaseMock
      })
        .then(() => {
          givenWindowHost.addEventListener('message', event => {
            try {
              if (event && event.data && event.data.__cmpReturn) {
                const cmpReturn = event.data.__cmpReturn
                expect(
                  cmpReturn.success,
                  'success value should be the returned by the cmp observer callback'
                ).to.deep.equal(expectedCmpSuccess)
                expect(
                  cmpReturn.returnValue,
                  'return value should be the returned by the cmp observer callback'
                ).to.deep.equal(expectedCmpReturnValue)
                expect(
                  cmpReturn.callId,
                  'callId value should be the same callId sent from the initial postMessage caller'
                ).to.deep.equal(givenCallId)
                expect(
                  givenWindowIframe.document.cookie,
                  'written cookie is not the same'
                ).to.be.equal(expectedCookieStored)

                done()
              }
            } catch (e) {
              done(e)
            }
          })
        })

        .then(() =>
          givenWindowIframe.postMessage(
            {
              __cmpCall: {
                command: givenCommand,
                parameter: givenParameter,
                callId: givenCallId
              }
            },
            '*'
          )
        )
        .catch(error => done(error))
    })
  })

  describe('Given a invalid command', () => {
    it('Should dispatch an error event with the same callId', done => {
      const givenCommand = "I'm Batman"
      const givenParameter = {}
      const givenCallId = 3
      const expectedCmpSuccess = false
      const expectedCmpReturnValue = 'CommandNotFoundError'

      globalStorage({
        window: givenWindowIframe,
        readCookieUseCase: {},
        writeCookieUseCase: {}
      })
        .then(() => {
          givenWindowHost.addEventListener('message', event => {
            try {
              if (event && event.data && event.data.__cmpReturn) {
                const cmpReturn = event.data.__cmpReturn
                expect(
                  cmpReturn.success,
                  'success value should be the returned by the cmp observer callback'
                ).to.deep.equal(expectedCmpSuccess)
                expect(
                  cmpReturn.returnValue.name,
                  'return value should be the returned by the cmp observer callback'
                ).to.deep.equal(expectedCmpReturnValue)
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
        })

        .then(() =>
          givenWindowIframe.postMessage(
            {
              __cmpCall: {
                command: givenCommand,
                parameter: givenParameter,
                callId: givenCallId
              }
            },
            '*'
          )
        )
        .catch(error => done(error))
    })
  })

  describe('Given a invalid event format', () => {
    it('Should dispatch an error event with the same callId', done => {
      const givenEvent = {
        wrongFormat: {
          wrongField: 'nothing!'
        }
      }
      const expectedCallId = undefined
      const expectedCmpSuccess = false
      const expectedCmpReturnValue = 'EventFormatError'

      globalStorage({
        window: givenWindowIframe,
        readCookieUseCase: {},
        writeCookieUseCase: {}
      })
        .then(() => {
          givenWindowHost.addEventListener('message', event => {
            try {
              if (event && event.data && event.data.__cmpReturn) {
                const cmpReturn = event.data.__cmpReturn
                expect(
                  cmpReturn.success,
                  'success value should be the returned by the cmp observer callback'
                ).to.deep.equal(expectedCmpSuccess)
                expect(
                  cmpReturn.returnValue.name,
                  'return value should be the returned by the cmp observer callback'
                ).to.deep.equal(expectedCmpReturnValue)
                expect(
                  cmpReturn.callId,
                  'callId value should be the same callId sent from the initial postMessage caller'
                ).to.deep.equal(expectedCallId)
                done()
              }
            } catch (e) {
              done(e)
            }
          })
        })

        .then(() =>
          givenWindowIframe.postMessage(
            {
              givenEvent
            },
            '*'
          )
        )
        .catch(error => done(error))
    })
  })
})
