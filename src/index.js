import Log from './cmp/infrastructure/Log'
import IABConsentManagementProviderV1 from './cmp/infrastructure/controller/IABConsentManagementProviderV1'
import commandConsumer from './cmp/infrastructure/controller/commandConsumer'
import PingUseCase from './cmp/application/PingUseCase'
import GetConsentDataUseCase from './cmp/application/GetConsentDataUseCase'
import CookieConsentRepository from './cmp/infrastructure/repository/CookieConsentRepository'

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

const iabCMP = new IABConsentManagementProviderV1({
  pingUseCase,
  getConsentDataUseCase
})

window.__cmp = window.__cmp || commandConsumer(log)(iabCMP)
