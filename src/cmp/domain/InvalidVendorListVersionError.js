export default class InvalidVendorListVersionError extends Error {
  constructor({vendorListVersion}) {
    super()
    this.name = 'InvalidVendorListVersionError'
    this.message = `Vendor list version ${vendorListVersion} is not valid.`
    this.stack = new Error().stack
  }
}
