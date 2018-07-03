import Log from '../../src/cmp/infrastructure/Log'
import IABVendorConsentsFactory from '../../src/cmp/infrastructure/factory/IABVendorConsentsFactory'
import FileVendorListRepository from './repository/FileVendorListRepository'
import IABConsentFactory from '../../src/cmp/infrastructure/factory/IABConsentFactory'
import InMemoryConsentRepository from './repository/InMemoryConsentRepository'
import ConsentStringVendorConsentsRepository from '../../src/cmp/infrastructure/repository/ConsentStringVendorConsentsRepository'
import GetConsentDataUseCase from '../../src/cmp/application/GetConsentDataUseCase'
import GetConsentStatusUseCase from '../../src/cmp/application/GetConsentStatusUseCase'
import GetVendorConsentsUseCase from '../../src/cmp/application/GetVendorConsentsUseCase'
import GetVendorListUseCase from '../../src/cmp/application/GetVendorListUseCase'
import PingUseCase from '../../src/cmp/application/PingUseCase'
import IABConsentManagementProviderV1 from '../../src/cmp/infrastructure/controller/IABConsentManagementProviderV1'
import commandConsumer from '../../src/cmp/infrastructure/controller/commandConsumer'
import SetVendorConsentsUseCase from '../../src/cmp/application/SetVendorConsentsUseCase'

const log = new Log({console})

// Default configuration values
const DEFAULT_GDPR_APPLIES = true
const DEFAULT_HAS_GLOBAL_SCOPE = false

// Resolve dependencies
const vendorConsentsFactory = new IABVendorConsentsFactory({
  gdprApplies: DEFAULT_GDPR_APPLIES,
  storeConsentGlobally: DEFAULT_HAS_GLOBAL_SCOPE
})

const vendorListRepository = new FileVendorListRepository()

const consentFactory = new IABConsentFactory()
const consentRepository = new InMemoryConsentRepository({
  log,
  consentFactory,
  vendorListRepository
})

const vendorConsentsRepository = new ConsentStringVendorConsentsRepository({
  vendorListRepository,
  consentRepository,
  vendorConsentsFactory
})

// Supported use cases
const getConsentDataUseCase = new GetConsentDataUseCase({
  consentRepository,
  hasGlobalScope: DEFAULT_HAS_GLOBAL_SCOPE,
  gdprApplies: DEFAULT_GDPR_APPLIES
})

const getConsentStatusUseCase = new GetConsentStatusUseCase({
  consentRepository
})

const getVendorConsentsUseCase = new GetVendorConsentsUseCase({
  vendorConsentsRepository
})

const getVendorListUseCase = new GetVendorListUseCase({
  vendorListRepository
})

const pingUseCase = new PingUseCase()

const setVendorConsentsUseCase = new SetVendorConsentsUseCase({
  vendorConsentsRepository
})

const iabCMP = new IABConsentManagementProviderV1({
  getConsentDataUseCase,
  getConsentStatusUseCase,
  getVendorConsentsUseCase,
  getVendorListUseCase,
  pingUseCase,
  setVendorConsentsUseCase
})

const CMP = commandConsumer(log)(iabCMP)

export {CMP}
