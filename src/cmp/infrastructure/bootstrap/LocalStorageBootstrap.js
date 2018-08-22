import Cmp from '../../application/Cmp'
import registerWindowCMP from '../controller/windowCommunicationRegistry'
import createEvent from '../createEvent'
import ContextLocalConsentContainer from '../container/local/ContextLocalConsentContainer'

export default class LocalStorageBootstrap {
  static init({window, config}) {
    Promise.resolve()
      .then(() =>
        new Cmp({
          container: ContextLocalConsentContainer.context({config, window})
        }).commandConsumer()
      )
      .then(
        cmp => registerWindowCMP({cmp, window})
        // TODO: should write the __cmpLocator
      )
      .then(() => createEvent({window, name: 'cmpReady'}))
  }
}
