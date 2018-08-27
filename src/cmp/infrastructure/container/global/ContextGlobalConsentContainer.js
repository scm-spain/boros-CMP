import DebugGlobalConsentContainer from './DebugGlobalConsentContainer'
import GlobalConsentContainer from './GlobalConsentContainer'
import {DEFAULT_DEBUG_KEYWORD} from '../../configuration/defaults'

export default class ContextGlobalConsentContainer {
  static context({window, config, iframe}) {
    if (
      window.document.location.search.indexOf(DEFAULT_DEBUG_KEYWORD) !== -1 ||
      config.log
    ) {
      return new DebugGlobalConsentContainer({
        config,
        window,
        iframe
      })
    } else {
      return new GlobalConsentContainer({
        config,
        window,
        iframe
      })
    }
  }
}
