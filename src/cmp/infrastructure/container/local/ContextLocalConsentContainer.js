import {DEFAULT_DEBUG_KEYWORD} from '../../configuration/defaults'
import DebugLocalConsentContainer from './DebugLocalConsentContainer'
import LocalConsentContainer from './LocalConsentContainer'

export default class ContextLocalConsentContainer {
  static context({config, window}) {
    if (window.document.location.search.indexOf(DEFAULT_DEBUG_KEYWORD)) {
      return new DebugLocalConsentContainer({
        config,
        window
      })
    } else {
      return new LocalConsentContainer({
        config,
        window
      })
    }
  }
}
