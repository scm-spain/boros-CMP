import FileVendorListRepository from '../../../integration/repository/FileVendorListRepository'
import {LEVEL, Log} from '../../../../cmp/infrastructure/service/log/Log'
import GlobalConsentContainer from '../../../../cmp/infrastructure/container/global/GlobalConsentContainer'

export default class TestGlobalStoreContainer extends GlobalConsentContainer {
  constructor({config, window, iframe}) {
    super({config, window, iframe, cmpVersion: 42, eager: false})
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
