const responseBuilder = ({callId, success, returnValue}) => ({
  __cmpReturn: {
    callId: callId,
    success: success,
    returnValue: returnValue
  }
})

export default responseBuilder
