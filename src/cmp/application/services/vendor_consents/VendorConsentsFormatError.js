export default class VendorConsentsFormatError extends Error {
  constructor({vendorConsents}) {
    super()
    this.name = 'VendorConsentsFormatError'
    this.message = `vendor consents object has an invalid format ${vendorConsents}`
    this.stack = new Error().stack
  }
}
