import DomainEventBus from '../../domain/event_bus/DomainEventBus'
import GetConsentDataUseCase from '../../application/services/consent/GetConsentDataUseCase'
import ChainedVendorListRepository from '../repository/ChainedVendorListRepository'
import InMemoryVendorListRepository from '../repository/InMemoryVendorListRepository'
import HttpVendorListRepository from '../repository/HttpVendorListRepository'
import ConsentStringVendorConsentsRepository from '../repository/ConsentStringVendorConsentsRepository'
import GetConsentStatusUseCase from '../../application/services/consent/GetConsentStatusUseCase'
import GetVendorConsentsUseCase from '../../application/services/vendor_consents/GetVendorConsentsUseCase'
import GetVendorListUseCase from '../../application/services/vendor_list/GetVendorListUseCase'
import PingUseCase from '../../application/services/ping/PingUseCase'
import SetVendorConsentsUseCase from '../../application/services/vendor_consents/SetVendorConsentsUseCase'
import Configuration from '../configuration/Configuration'
import {errorObserverFactory} from '../observer/errorObserverFactory'
import {NewVendorsStatusService} from '../../domain/vendor_consents/NewVendorsStatusService'
import UpdateConsentVendorsService from '../../domain/consent/UpdateConsentVendorsService'
import {GLOBAL_VENDOR_LIST_VERSION_CHANGED} from '../../domain/consent/globalVendorListVersionChanged'
import ConsentFactory from '../../domain/consent/ConsentFactory'
import VendorConsentsFactory from '../../domain/vendor_consents/VendorConsentsFactory'
import {Log} from '../service/log/Log'
import {globalVendorListVersionChangedObserverFactory} from '../observer/globalVendorListVersionChangedObserverFactory'
import HttpTranslationVendorListRepository from '../repository/HttpTranslationVendorListRepository'
import {fetcherFactory} from '../service/fetcher'

export default class BaseConsentContainer {
  constructor({config, window, eager = true} = {}) {
    this._config = new Configuration({
      gdpr: config.gdpr,
      consent: config.consent,
      vendorList: config.vendorList,
      log: config.log
    })
    this._window = window
    this._instances = new Map()
    if (eager) {
      this._buildEagerSingletonInstances()
    }
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
    return this._instances.get(key)
  }

  _buildConsentFactory() {
    return new ConsentFactory({
      allowedVendorIds: this._config.consent.allowedVendorIds,
      vendorListRepository: this.getInstance({key: 'VendorListRepository'})
    })
  }

  _buildVendorListRepository() {
    return new ChainedVendorListRepository({
      inMemoryVendorListRepository: this.getInstance({
        key: 'InMemoryVendorListRepository'
      }),
      httpVendorListRepository: this.getInstance({
        key: 'HttpTranslationVendorListRepository'
      })
    })
  }

  _buildInMemoryVendorListRepository() {
    return new InMemoryVendorListRepository()
  }

  _buildHttpVendorListRepository() {
    return new HttpVendorListRepository({
      fetcher: this.getInstance({key: 'Fetcher'}),
      vendorListHost: this._config.vendorList.host,
      vendorListFilename: this._config.vendorList.filename
    })
  }

  _buildHttpTranslationVendorListRepository() {
    return new HttpTranslationVendorListRepository({
      fetcher: this.getInstance({key: 'Fetcher'}),
      vendorListHost: this._config.vendorList.host,
      consentLanguage: this._config.consent.consentLanguage,
      vendorListRepository: this.getInstance({key: 'HttpVendorListRepository'})
    })
  }

  _buildFetcher() {
    return fetcherFactory()
  }

  _buildLog() {
    return new Log({level: this._config.log.level, console: console})
  }

  _buildVendorConsentsFactory() {
    return new VendorConsentsFactory({
      gdprApplies: this._config.gdpr.gdprApplies,
      storeConsentGlobally: this._config.gdpr.storeConsentGlobally
    })
  }

  _buildVendorConsentsRepository() {
    return new ConsentStringVendorConsentsRepository({
      cmpId: this._config.consent.cmpId,
      cmpVersion: this._config.consent.cmpVersion,
      consentScreen: this._config.consent.consentScreen,
      consentLanguage: this._config.consent.consentLanguage,
      vendorListRepository: this.getInstance({key: 'VendorListRepository'}),
      consentRepository: this.getInstance({key: 'ConsentRepository'}),
      vendorConsentsFactory: this.getInstance({key: 'VendorConsentsFactory'})
    })
  }

  _buildGetConsentDataUseCase() {
    return new GetConsentDataUseCase({
      consentRepository: this.getInstance({key: 'ConsentRepository'}),
      storeConsentGlobally: this._config.gdpr.storeConsentGlobally,
      gdprApplies: this._config.gdpr.gdprApplies
    })
  }

  _buildGetConsentStatusUseCase() {
    return new GetConsentStatusUseCase({
      consentRepository: this.getInstance({key: 'ConsentRepository'})
    })
  }

  _buildGetVendorConsentsUseCase() {
    return new GetVendorConsentsUseCase({
      vendorConsentsRepository: this.getInstance({
        key: 'VendorConsentsRepository'
      })
    })
  }

  _buildGetVendorListUseCase() {
    return new GetVendorListUseCase({
      vendorListRepository: this.getInstance({key: 'VendorListRepository'})
    })
  }

  _buildPingUseCase() {
    return new PingUseCase()
  }

  _buildSetVendorConsentsUseCase() {
    return new SetVendorConsentsUseCase({
      vendorConsentsRepository: this.getInstance({
        key: 'VendorConsentsRepository'
      })
    })
  }

  _buildErrorObserverFactory() {
    const logger = this.getInstance({key: 'Log'})
    return errorObserverFactory(logger)
  }

  _buildUpdateConsentVendorsService() {
    return new UpdateConsentVendorsService({
      newVendorsStatusService: this.getInstance({
        key: 'NewVendorsStatusService'
      }),
      vendorConsentsRepository: this.getInstance({
        key: 'VendorConsentsRepository'
      })
    })
  }

  _buildNewVendorsStatusService() {
    return new NewVendorsStatusService({
      option: this._config.consent.newVendorsStatusOption
    })
  }

  _buildGlobalVendorListVersionChangedObserver() {
    return globalVendorListVersionChangedObserverFactory({
      updateConsentVendorsService: this.getInstance({
        key: 'UpdateConsentVendorsService'
      })
    })
  }

  _buildEagerSingletonInstances() {
    DomainEventBus.register({
      eventName: GLOBAL_VENDOR_LIST_VERSION_CHANGED,
      observer: this.getInstance({
        key: 'GlobalVendorListVersionChangedObserver'
      })
    })
  }
}
