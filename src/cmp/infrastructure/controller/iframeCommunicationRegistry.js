const registerIframeCommunication = ({cmp, window}) =>
  Promise.resolve(cmpCallConsumerFactory({cmp})).then(cmpCallConsumer => {
    window.addEventListener('message', event => {
      if (event && event.source && event.data && event.data.__cmpCall) {
        cmpCallConsumer({
          cmpCall: event.data.__cmpCall,
          source: event.source
        })
      }
    })
  })

const cmpCallConsumerFactory = ({cmp}) => ({cmpCall, source}) =>
  cmp(cmpCall.command, cmpCall.parameter, (result, success) =>
    source.postMessage({
      __cmpReturn: {
        returnValue: result,
        success,
        callId: cmpCall.callId
      }
    })
  )

export default registerIframeCommunication
