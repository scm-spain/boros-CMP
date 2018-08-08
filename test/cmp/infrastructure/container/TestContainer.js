import FileVendorListRepository from '../../../integration/repository/FileVendorListRepository'
import BaseConsentContainer from '../../../../src/cmp/infrastructure/container/BaseConsentContainer'
import CookieConsentRepository from '../../../../src/cmp/infrastructure/repository/CookieConsentRepository'
import CookieHandler from '../../../../src/cmp/infrastructure/service/CookieHandler'
import {LEVEL, Log} from '../../../../src/cmp/infrastructure/Log'

export default class TestContainer extends BaseConsentContainer {
  constructor({config, window}) {
    super({config, window, eager: false})
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

  _buildVendorListRepository() {
    return new FileVendorListRepository()
  }

  _buildLog() {
    return new Log({
      level: LEVEL.error,
      console: this._window.console
    })
  }
}
