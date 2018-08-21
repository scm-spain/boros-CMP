import GetConsentDataUseCase from '../../application/services/GetConsentDataUseCase'
import IABConsentFactory from '../factory/IABConsentFactory'
import ChainedVendorListRepository from '../repository/ChainedVendorListRepository'
import InMemoryVendorListRepository from '../repository/InMemoryVendorListRepository'
import HttpVendorListRepository from '../repository/HttpVendorListRepository'
import {Log} from '../Log'
import IABVendorConsentsFactory from '../factory/IABVendorConsentsFactory'
import ConsentStringVendorConsentsRepository from '../repository/ConsentStringVendorConsentsRepository'
import GetConsentStatusUseCase from '../../application/services/GetConsentStatusUseCase'
import GetVendorConsentsUseCase from '../../application/services/GetVendorConsentsUseCase'
import GetVendorListUseCase from '../../application/services/GetVendorListUseCase'
import PingUseCase from '../../application/services/PingUseCase'
import SetVendorConsentsUseCase from '../../application/services/SetVendorConsentsUseCase'
import Configuration from '../configuration/Configuration'

export default class BaseConsentContainer {
  constructor({config, cmpVersion, window, eager = true} = {}) {
    this._config = new Configuration({
      gdpr: config.gdpr,
      consent: config.consent,
      httpVendorList: config.httpVendorList,
      log: config.log,
      cmpVersion: cmpVersion
    })
    this._window = window
    this._instances = new Map()
    if (eager) this._buildEagerSingletonInstances()
  }

  getInstance({key}) {
    if (undefined === this._instances.get(key)) {
      try {
        this._instances.set(key, this['_build' + key]())
      } catch (e) {
        throw new Error(`Error creating instance: ${key}`, e)
      }
    }
    return this._instances.get(key)
  }

  _buildConsentFactory() {
    return new IABConsentFactory()
  }

  _buildVendorListRepository() {
    return new ChainedVendorListRepository({
      inMemoryVendorListRepository: this.getInstance({
        key: 'InMemoryVendorListRepository'
      }),
      httpVendorListRepository: this.getInstance({
        key: 'HttpVendorListRepository'
      })
    })
  }

  _buildInMemoryVendorListRepository() {
    return new InMemoryVendorListRepository()
  }

  _buildHttpVendorListRepository() {
    return new HttpVendorListRepository({
      latestLocator: this._config.httpVendorList.latestLocator,
      versionLocator: this._config.httpVendorList.versionLocator
    })
  }

  _buildLog() {
    return new Log({level: this._config.log.level, console: console})
  }

  _buildVendorConsentsFactory() {
    return new IABVendorConsentsFactory({
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

  _buildGetVendorConsentUseCase() {
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

  _buildEagerSingletonInstances() {}
}
