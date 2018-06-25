import Log from './cmp/infrastructure/Log'
import IABConsentManagementProviderV1 from './cmp/infrastructure/controller/IABConsentManagementProviderV1'
import commandConsumer from './cmp/infrastructure/controller/commandConsumer'
import PingUseCase from './cmp/application/PingUseCase'
import GetConsentDataUseCase from './cmp/application/GetConsentDataUseCase'
import CookieConsentRepository from './cmp/infrastructure/repository/CookieConsentRepository'
import GetConsentStatusUseCase from './cmp/application/GetConsentStatusUseCase'

const log = new Log({console})

// Default configuration values
const DEFAULT_GDPR_APPLIES = true
const DEFAULT_HAS_GLOBAL_SCOPE = false

// Resolve dependencies
const consentRepository = new CookieConsentRepository({
  dom: window.document
})

// Supported use cases
const pingUseCase = new PingUseCase()
const getConsentDataUseCase = new GetConsentDataUseCase({
  consentRepository: consentRepository,
  hasGlobalScope: DEFAULT_HAS_GLOBAL_SCOPE,
  gdprApplies: DEFAULT_GDPR_APPLIES
})
const getConsentStatusUseCase = new GetConsentStatusUseCase({
  consentRepository: consentRepository
})

const iabCMP = new IABConsentManagementProviderV1({
  pingUseCase,
  getConsentDataUseCase,
  getConsentStatusUseCase
})

window.__cmp = window.__cmp || commandConsumer(log)(iabCMP)

// Launch event as CMP is ready
const event = new window.CustomEvent('cmpReady', {})
window.document.dispatchEvent(event)
