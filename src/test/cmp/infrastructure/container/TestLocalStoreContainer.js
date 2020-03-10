import FileVendorListRepository from '../../../integration/repository/FileVendorListRepository'
import {LEVEL, Log} from '../../../../cmp/infrastructure/service/log/Log'
import LocalConsentContainer from '../../../../cmp/infrastructure/container/local/LocalConsentContainer'

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
