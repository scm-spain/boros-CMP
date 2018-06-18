import Log from './cmp/infrastructure/Log'
import ConsentManagementProvider from './cmp/application/ConsentManagementProvider'
import IABConsentManagementProviderV1 from './cmp/infrastructure/controller/IABConsentManagementProviderV1'
import commandConsumer from './cmp/infrastructure/controller/commandConsumer'

const log = new Log({console})
const cmp = new ConsentManagementProvider()
const iabCMP = new IABConsentManagementProviderV1({
  consentManagementProvider: cmp
})

window.__cmp = window.__cmp || commandConsumer(log)(iabCMP)
