export default class VendorConsentsEntryError extends Error {
  constructor({entry}) {
    super()
    this.name = 'VendorConsentsEntryError'
    this.message = `Vendor consents entry is invalid ${entry}`
    this.stack = new Error().stack
  }
}
