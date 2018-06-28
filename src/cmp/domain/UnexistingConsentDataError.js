export default class UnexistingConsentDataError extends Error {
  constructor() {
    super()
    this.name = 'UnexistingConsentDataError'
    this.message = `Consent Data has not been set yet`
    this.stack = new Error().stack
  }
}
