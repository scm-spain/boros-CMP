export default class CMPFacade {
  constructor({cmp, timeout = 1000} = {}) {
    this._cmp = cmp
    this._timeout = timeout
  }

  getVendorConsents(vendorIds) {
    return Promise.resolve(this._command('getVendorConsents', vendorIds))
  }

  setVendorConsents(vendorConsents) {
    return Promise.resolve(this._command('setVendorConsents', vendorConsents))
  }

  getConsentData(consentStringVersion) {
    return Promise.resolve(
      this._command('getConsentData', consentStringVersion)
    )
  }

  ping() {
    return Promise.resolve(this._command('ping'))
  }

  getVendorList(vendorListVersion) {
    return Promise.resolve(this._command('getVendorList', vendorListVersion))
  }

  getConsentStatus() {
    return Promise.resolve(this._command('getConsentStatus'))
  }

  _command(command, parameters) {
    return Promise.resolve().then(() =>
      Promise.race([
        new Promise((resolve, reject) =>
          this._cmp(command, parameters, (result, status) =>
            resolve({
              result,
              status
            })
          )
        ),
        new Promise((resolve, reject) => {
          const timeoutId = setTimeout(() => {
            clearTimeout(timeoutId)
            reject(new Error('Timeout on: ' + command))
          }, this._timeout)
        })
      ])
    )
  }
}
