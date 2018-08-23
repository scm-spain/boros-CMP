import Cmp from '../../application/Cmp'
import registerWindowCMP from '../controller/windowCommunicationRegistry'
import createEvent from '../createEvent'
import GlobalConsentContainer from '../container/GlobalConsentContainer'
import IframeRegistry from '../service/IframeRegistry'
import registerCmpLocator from '../controller/registerCmpLocator'
const GLOBAL_CONSENT_STORE_INITIALIZATION_ERROR =
  'Error initializing global storage:'
export default class GlobalStorageBootstrap {
  static init({window, config}) {
    Promise.resolve(config)
      .then(config =>
        Promise.all([
          registerIframe(window)(config),
          registerCmpLocator({dom: window.document})
        ])
      )
      .then(
        ([iframe, cmpLocatorIframe]) =>
          new GlobalConsentContainer({
            config,
            window,
            iframe
          })
      )
      .then(container =>
        Promise.all([
          CMPFunctionalFacade(container),
          registerIframeCommunication(container)
        ])
      )
      .then(([cmp, undefined]) => registerWindowCMP({cmp, window}))
      .then(() => createEvent({window, name: 'cmpReady'}))
  }
}

const registerIframeCommunication = container =>
  container.getInstance({key: 'IframeCommunication'}).register()

const registerIframe = window => config =>
  new IframeRegistry({
    dom: window.document
  })
    .register({url: config.gdpr.globalConsentLocation})
    .catch(error =>
      console.error(GLOBAL_CONSENT_STORE_INITIALIZATION_ERROR, error)
    )

const CMPFunctionalFacade = container => new Cmp({container}).commandConsumer()
