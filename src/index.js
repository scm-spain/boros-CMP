import Log from './cmp/infrastructure/Log'
import IABConsentManagementProviderV1 from './cmp/infrastructure/controller/IABConsentManagementProviderV1'
import commandConsumer from './cmp/infrastructure/controller/commandConsumer'
import PingUseCase from './cmp/application/PingUseCase'

const log = new Log({console})

// Supported use cases
const pingUseCase = new PingUseCase()

const iabCMP = new IABConsentManagementProviderV1({
  pingUseCase
})

window.__cmp = window.__cmp || commandConsumer(log)(iabCMP)
