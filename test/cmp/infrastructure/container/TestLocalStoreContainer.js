import FileVendorListRepository from '../../../integration/repository/FileVendorListRepository'
import {LEVEL, Log} from '../../../../src/cmp/infrastructure/Log'
import LocalConsentContainer from '../../../../src/cmp/infrastructure/container/LocalConsentContainer'

export default class TestLocalStoreContainer extends LocalConsentContainer {
  constructor({config, window}) {
    super({config, window, cmpVersion: 42, eager: false})
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
