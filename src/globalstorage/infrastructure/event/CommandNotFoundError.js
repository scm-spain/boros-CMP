export default class CommandNotFoundError extends Error {
  constructor(callId) {
    super()
    this.name = 'CommandNotFoundError'
    this.callId = callId
    this.message = 'Command not found!'
  }
}
