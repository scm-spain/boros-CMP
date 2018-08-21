export default class RequestTimeoutError extends Error {
  constructor(callId) {
    super()
    this.name = 'RequestTimeoutError'
    this.callId = callId
    this.message = `Timeout on request id ${callId}`
    this.stack = new Error().stack
  }
}
