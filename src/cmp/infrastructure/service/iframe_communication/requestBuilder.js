const requestBuilder = ({callId, command, parameter}) => ({
  __cmpCall: {
    callId: callId,
    command: command,
    parameter: parameter
  }
})

export default requestBuilder
