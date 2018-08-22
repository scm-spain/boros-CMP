export default class GlobalVendorListAccessError extends Error {
  constructor(message) {
    super()
    this.name = 'GlobalVendorListAccessError'
    this.message = message
    this.stack = new Error().stack
  }
}
