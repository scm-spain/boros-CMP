/* eslint-disable no-undef */
import CookieConsentRepository from '../repository/CookieConsentRepository'
import CookieHandler from '../service/CookieHandler'
import BaseConsentContainer from './BaseConsentContainer'
import Configuration from '../configuration/Configuration'

export default class LocalConsentContainer extends BaseConsentContainer {
  constructor({config, window, eager = true} = {}) {
    super({
      config: new Configuration({
        gdpr: config.gdpr,
        consent: config.consent,
        httpVendorList: config.httpVendorList,
        log: config.log,
        cmpVersion: CMP_VERSION
      }),
      window,
      eager: false
    })
    if (eager) this._buildEagerSingletonInstances()
  }

  _buildConsentRepository() {
    return new CookieConsentRepository({
      cookieHandler: this.getInstance({key: 'CookieHandler'}),
      consentFactory: this.getInstance({key: 'ConsentFactory'}),
      vendorListRepository: this.getInstance({key: 'VendorListRepository'})
    })
  }

  _buildCookieHandler() {
    return new CookieHandler({dom: this._window.document})
  }

  _buildEagerSingletonInstances() {}
}
