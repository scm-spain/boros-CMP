const registerIframeCommunication = ({window}) =>
  Promise.resolve(cmpCallConsumerFactory({window})).then(cmpCallConsumer => {
    window.addEventListener('message', event => {
      if (event && event.source && event.data && event.data.__cmpCall) {
        cmpCallConsumer({
          cmpCall: event.data.__cmpCall,
          source: event.source
        })
      }
    })
  })

const cmpCallConsumerFactory = ({window}) => ({cmpCall, source}) =>
  window.__cmp(cmpCall.command, cmpCall.parameter, (result, success) =>
    source.postMessage({
      __cmpReturn: {
        returnValue: result,
        success,
        callId: cmpCall.callId
      }
    })
  )

export default registerIframeCommunication
