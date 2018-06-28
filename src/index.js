import Log from './cmp/infrastructure/Log'
import IABConsentManagementProviderV1 from './cmp/infrastructure/controller/IABConsentManagementProviderV1'
import commandConsumer from './cmp/infrastructure/controller/commandConsumer'
import PingUseCase from './cmp/application/PingUseCase'
import GetConsentDataUseCase from './cmp/application/GetConsentDataUseCase'
import CookieConsentRepository from './cmp/infrastructure/repository/CookieConsentRepository'
import GetConsentStatusUseCase from './cmp/application/GetConsentStatusUseCase'
import IABConsentFactory from './cmp/infrastructure/factory/IABConsentFactory'
import HttpVendorListRepository from './cmp/infrastructure/repository/HttpVendorListRepository'
import GetVendorConsentsUseCase from './cmp/application/GetVendorConsentsUseCase'
import ConsentStringVendorConsentsRepository from './cmp/infrastructure/repository/ConsentStringVendorConsentsRepository'
import IABVendorConsentsFactory from './cmp/infrastructure/factory/IABVendorConsentsFactory'
import GetVendorListUseCase from './cmp/application/GetVendorListUseCase'

const log = new Log({console})

// Default configuration values
const DEFAULT_GDPR_APPLIES = true
const DEFAULT_HAS_GLOBAL_SCOPE = false

// Resolve dependencies
const vendorConsentsFactory = new IABVendorConsentsFactory({
  gdprApplies: DEFAULT_GDPR_APPLIES,
  storeConsentGlobally: DEFAULT_HAS_GLOBAL_SCOPE
})

const vendorListRepository = new HttpVendorListRepository()

const consentFactory = new IABConsentFactory()
const consentRepository = new CookieConsentRepository({
  dom: window.document,
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

const iabCMP = new IABConsentManagementProviderV1({
  getConsentDataUseCase,
  getConsentStatusUseCase,
  getVendorConsentsUseCase,
  getVendorListUseCase,
  pingUseCase
})

window.__cmp = window.__cmp || commandConsumer(log)(iabCMP)

// Launch event as CMP is ready
const event = new window.CustomEvent('cmpReady', {})
window.document.dispatchEvent(event)
