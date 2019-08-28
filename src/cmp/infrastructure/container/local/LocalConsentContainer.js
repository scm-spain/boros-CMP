import CookieConsentRepository from '../../repository/CookieConsentRepository'
import CookieHandler from '../../service/CookieHandler'
import BaseConsentContainer from '../BaseConsentContainer'

export default class LocalConsentContainer extends BaseConsentContainer {
  constructor({config, window} = {}) {
    super({config, window})
  }

  _buildConsentRepository() {
    return new CookieConsentRepository({
      cookieHandler: this.getInstance({key: 'CookieHandler'}),
      consentFactory: this.getInstance({key: 'ConsentFactory'})
    })
  }

  _buildCookieHandler() {
    return new CookieHandler({dom: this._window.document})
  }

  _buildEagerSingletonInstances() {
    super._buildEagerSingletonInstances()
  }
}
