import GlobalConsentContainer from './GlobalConsentContainer'
import {VENDOR_CONSENTS_CREATED} from '../../../domain/vendor_consents/vendorConsentsCreated'
import {OBSERVER_ERROR_THROWN} from '../../../domain/event_bus/observerErrorThrown'
import DomainEventBus from '../../../domain/event_bus/DomainEventBus'

export default class DebugGlobalConsentContainer extends GlobalConsentContainer {
  constructor({config, window, iframe}) {
    super({config, window, iframe})
  }

  _buildEagerSingletonInstances() {
    this.getInstance({key: 'IframeCommunication'})
    const errorObserver = this.getInstance({key: 'ErrorObserverFactory'})
    const debugObserver = this.getInstance({key: 'DebugObserverFactory'})
    DomainEventBus.register({
      eventName: OBSERVER_ERROR_THROWN,
      observer: errorObserver
    })
    DomainEventBus.register({
      eventName: VENDOR_CONSENTS_CREATED,
      observer: debugObserver
    })
  }
}
