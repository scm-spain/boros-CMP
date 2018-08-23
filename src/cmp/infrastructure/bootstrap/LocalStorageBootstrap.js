import Cmp from '../../application/Cmp'
import registerWindowCMP from '../controller/windowCommunicationRegistry'
import createEvent from '../createEvent'
import LocalConsentContainer from '../container/LocalConsentContainer'
import registerCmpLocator from '../controller/registerCmpLocator'

export default class LocalStorageBootstrap {
  static init({window, config}) {
    Promise.resolve()
      .then(() =>
        Promise.all([
          new Cmp({
            container: new LocalConsentContainer({
              config,
              window
            })
          }).commandConsumer(),
          registerCmpLocator({dom: window.document})
        ])
      )
      .then(([cmp, cmpLocatorIframe]) => registerWindowCMP({cmp, window}))
      .then(() => createEvent({window, name: 'cmpReady'}))
  }
}
