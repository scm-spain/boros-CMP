import {expect} from 'chai'
import {READ_CONSENT_COMMAND} from '../../../../../src/cmp/infrastructure/configuration/iframeConsentCommands'
import IframeCommunicationClient from '../../../../../src/cmp/infrastructure/service/iframe_communication/IframeCommunicationClient'
import {JSDOM} from 'jsdom'
import fixJsdomPostMessageWithEventSource from '../../controller/fixJSDOMPostMessage'
import responseBuilder from '../../../../../src/cmp/infrastructure/service/iframe_communication/responseBuilder'

describe('IframeCommunicationClient', () => {
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

  describe('Given a request', () => {
    it('Should resolve with the expected response', done => {
      const givenTransactionId = 3
      const givenRequest = {
        command: READ_CONSENT_COMMAND,
        params: {}
      }

      const iframeCommunicationClient = new IframeCommunicationClient({
        origin: givenWindowHost,
        target: givenWindowIframe,
        idGenerator: {
          generate: () => givenTransactionId
        }
      })

      const expectedConsentValue = 'Viaje a bali!!'

      givenWindowIframe.addEventListener('message', event => {
        event.source.postMessage(
          responseBuilder({
            callId: event.data.__cmpCall.callId,
            success: true,
            returnValue: expectedConsentValue
          }),
          '*'
        )
      })

      iframeCommunicationClient
        .request(givenRequest)
        .then(response => {
          expect(response).to.equal(expectedConsentValue)
          done()
        })
        .catch(error => done(new Error(error)))
    })
  })
})
