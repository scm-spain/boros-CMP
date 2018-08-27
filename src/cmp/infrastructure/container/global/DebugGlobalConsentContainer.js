import GlobalConsentContainer from './GlobalConsentContainer'
import {VENDOR_CONSENTS_CREATED} from '../../../domain/vendor_consents/vendorConsentsCreated'
import {OBSERVER_ERROR_THROWN} from '../../../domain/event_bus/observerErrorThrown'
import DomainEventBus from '../../../domain/event_bus/DomainEventBus'
import {debugHandler} from '../../service/log/loggerDebugHandler'
import {debugObserverFactory} from '../../observer/debugObserverFactory'
import {LEVEL} from '../../service/log/Log'

export default class DebugGlobalConsentContainer extends GlobalConsentContainer {
  constructor({config, window, iframe}) {
    super({
      config: {
        ...config,
        log: {
          level: LEVEL.debug
        }
      },
      window,
      iframe
    })
  }

  getInstance({key}) {
    if (undefined === this._instances.get(key)) {
      try {
        this._instances.set(key, this['_build' + key]())
      } catch (e) {
        throw new Error(
          `Error creating instance: ${key}, detailed message:${e.message}`
        )
      }
    }
    return key === 'Log'
      ? this._instances.get(key)
      : new Proxy(
          this._instances.get(key),
          debugHandler(this._instances.get('Log'))
        )
  }

  _buildDebugObserverFactory() {
    const logger = this.getInstance({key: 'Log'})
    return debugObserverFactory(logger)
  }

  _buildEagerSingletonInstances() {
    this.getInstance({key: 'Log'})
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
