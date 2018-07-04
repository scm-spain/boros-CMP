import IABVendorConsentsFactory from './factory/IABVendorConsentsFactory'
import IABConsentFactory from './factory/IABConsentFactory'
import HttpVendorListRepository from './repository/HttpVendorListRepository'
import CookieConsentRepository from './repository/CookieConsentRepository'
import ConsentStringVendorConsentsRepository from './repository/ConsentStringVendorConsentsRepository'
import GetConsentDataUseCase from '../application/GetConsentDataUseCase'
import GetConsentStatusUseCase from '../application/GetConsentStatusUseCase'
import GetVendorConsentsUseCase from '../application/GetVendorConsentsUseCase'
import GetVendorListUseCase from '../application/GetVendorListUseCase'
import PingUseCase from '../application/PingUseCase'
import SetVendorConsentsUseCase from '../application/SetVendorConsentsUseCase'
import IABConsentManagementProviderV1 from './controller/IABConsentManagementProviderV1'
import commandConsumer from './controller/commandConsumer'
import Log from './Log'
import ChainedVendorListRepository from './repository/ChainedVendorListRepository'
import InMemoryVendorListRepository from './repository/InMemoryVendorListRepository'

const initializeCMP = ({
  storeConsentGlobally = false,
  gdprApplies = true,
  vendorConsentsFactory,
  consentFactory,
  vendorListRepository,
  consentRepository,
  vendorConsentsRepository,
  log
} = {}) =>
  Promise.resolve().then(() => {
    {
      // Resolve dependencies
      const _log = log || new Log({console})

      const _vendorConsentsFactory =
        vendorConsentsFactory ||
        new IABVendorConsentsFactory({
          gdprApplies,
          storeConsentGlobally
        })

      const _consentFactory = consentFactory || new IABConsentFactory()

      const _remoteVendorListRepository =
        vendorListRepository || new HttpVendorListRepository()
      const _inMemoryVendorListRepository = new InMemoryVendorListRepository()
      const _vendorListRepository = new ChainedVendorListRepository({
        inMemoryVendorListRepository: _inMemoryVendorListRepository,
        httpVendorListRepository: _remoteVendorListRepository
      })

      const _consentRepository =
        consentRepository ||
        new CookieConsentRepository({
          dom: window.document,
          consentFactory: _consentFactory,
          vendorListRepository: _vendorListRepository
        })

      const _vendorConsentsRepository =
        vendorConsentsRepository ||
        new ConsentStringVendorConsentsRepository({
          vendorListRepository: _vendorListRepository,
          consentRepository: _consentRepository,
          vendorConsentsFactory: _vendorConsentsFactory
        })

      // Supported use cases
      const getConsentDataUseCase = new GetConsentDataUseCase({
        consentRepository: _consentRepository,
        storeConsentGlobally,
        gdprApplies
      })

      const getConsentStatusUseCase = new GetConsentStatusUseCase({
        consentRepository: _consentRepository
      })

      const getVendorConsentsUseCase = new GetVendorConsentsUseCase({
        vendorConsentsRepository: _vendorConsentsRepository
      })

      const getVendorListUseCase = new GetVendorListUseCase({
        vendorListRepository: _vendorListRepository
      })

      const pingUseCase = new PingUseCase()

      const setVendorConsentsUseCase = new SetVendorConsentsUseCase({
        vendorConsentsRepository: _vendorConsentsRepository
      })

      const cmpProvider = new IABConsentManagementProviderV1({
        getConsentDataUseCase,
        getConsentStatusUseCase,
        getVendorConsentsUseCase,
        getVendorListUseCase,
        pingUseCase,
        setVendorConsentsUseCase
      })

      return commandConsumer(_log)(cmpProvider)
    }
  })
export default initializeCMP
