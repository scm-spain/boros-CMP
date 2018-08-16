import Cmp from '../../application/Cmp'
import registerWindowCMP from '../controller/windowCommunicationRegistry'
import createEvent from '../createEvent'
import GlobalConsentContainer from '../container/GlobalConsentContainer'
const GLOBAL_CONSENT_STORE_INITIALIZATION_ERROR =
  'Error initializing global storage:'
export default class GlobalStorageBootstrap {
  static init({window, config}) {
    Promise.resolve()
      .then(
        () =>
          new GlobalConsentContainer({
            config,
            window
          })
      )
      .then(container =>
        Promise.all([
          CMPFunctionalFacade(container),
          registerIframe(container)(config),
          registerIframeCommunication(container)
        ])
      )
      .then(
        ([cmp, iframe, undefined]) => registerWindowCMP({cmp, window})
        // TODO: should write the __cmpLocator
      )
      .then(() => createEvent({name: 'cmpReady'}))
  }
}

const registerIframeCommunication = container =>
  container.getInstance({key: 'IframeCommunication'}).register()

const registerIframe = container => config =>
  container
    .getInstance({key: 'IframeRegistry'})
    .register({url: config.gdpr.globalConsentLocation})
    .catch(error =>
      container
        .getInstance({key: 'Log'})
        .error(GLOBAL_CONSENT_STORE_INITIALIZATION_ERROR, error)
    )
const CMPFunctionalFacade = container => new Cmp({container}).commandConsumer()
