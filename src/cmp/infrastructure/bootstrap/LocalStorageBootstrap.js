import Cmp from '../../application/Cmp'
import registerWindowCMP from '../controller/windowCommunicationRegistry'
import createEvent from '../createEvent'
import ContextLocalConsentContainer from '../container/local/ContextLocalConsentContainer'
import registerCmpLocator from '../controller/registerCmpLocator'

export default class LocalStorageBootstrap {
  static init({window, config}) {
    return Promise.resolve()
      .then(() =>
        Promise.all([
          new Cmp({
            container: ContextLocalConsentContainer.context({config, window})
          }).commandConsumer(),
          registerCmpLocator({dom: window.document})
        ])
      )
      .then(([cmp, cmpLocatorIframe]) => registerWindowCMP({cmp, window}))
      .then(() => createEvent({window, name: 'cmpReady'}))
  }
}
