export default class IframeCommunication {
  constructor({window}) {
    this._window = window
  }

  register() {
    return Promise.resolve().then(() => {
      this._window.addEventListener('message', event => {
        if (event && event.source && event.data && event.data.__cmpCall) {
          this._cmpCallConsumer({
            cmpCall: event.data.__cmpCall,
            source: event.source
          })
        }
      })
    })
  }

  _cmpCallConsumer({cmpCall, source}) {
    this._window.__cmp(cmpCall.command, cmpCall.parameter, (result, success) =>
      source.postMessage({
        __cmpReturn: {
          returnValue: result,
          success,
          callId: cmpCall.callId
        }
      })
    )
  }
}
