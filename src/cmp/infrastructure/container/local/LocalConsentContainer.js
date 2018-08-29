/* eslint-disable no-undef */
import CookieConsentRepository from '../../repository/CookieConsentRepository'
import CookieHandler from '../../service/CookieHandler'
import BaseConsentContainer from '../BaseConsentContainer'

export default class LocalConsentContainer extends BaseConsentContainer {
  constructor({config, window, cmpVersion = CMP_VERSION, eager} = {}) {
    super({config, cmpVersion, window})
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

  _buildEagerSingletonInstances() {
    super._buildEagerSingletonInstances()
  }
}
