import requestBuilder from './requestBuilder'
import responseBuilder from './responseBuilder'
import RequestTimeoutError from './RequestTimeoutError'

const POST_MESSAGE_ID = 'message'
const POST_MESSAGE_TARGET_ORIGIN = '*'
const REQUEST_TIMEOUT = 200

export default class IframeCommunicationClient {
  constructor({origin, target, idGenerator}) {
    this._origin = origin
    this._target = target
    this._idGenerator = idGenerator
  }

  request(request) {
    const transactionId = this._idGenerator.generate()
    return Promise.race([
      this._doRequest({request, transactionId}),
      this._timeout({transactionId})
    ])
  }

  _doRequest({request, transactionId}) {
    return new Promise((resolve, reject) => {
      this._origin.addEventListener(POST_MESSAGE_ID, event => {
        const response = responseBuilder({...event.data.__cmpReturn})
        if (response.__cmpReturn.callId === transactionId) {
          if (response.__cmpReturn.success) {
            resolve(response.__cmpReturn.returnValue)
          } else {
            reject(response.__cmpReturn.returnValue)
          }
        }
      })

      this._target.postMessage(
        requestBuilder({
          callId: transactionId,
          command: request.command,
          parameter: {...request.params}
        }),
        POST_MESSAGE_TARGET_ORIGIN
      )
    })
  }

  _timeout({transactionId}) {
    return new Promise((resolve, reject) => {
      let wait = setTimeout(() => {
        clearTimeout(wait)
        reject(new RequestTimeoutError(transactionId))
      }, REQUEST_TIMEOUT)
    })
  }
}
