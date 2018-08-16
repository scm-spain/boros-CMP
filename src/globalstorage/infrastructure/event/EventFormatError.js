export default class EventFormatError extends Error {
  constructor(callId) {
    super()
    this.name = 'EventFormatError'
    this.callId = callId
    this.message = 'Format not valid!'
  }
}
