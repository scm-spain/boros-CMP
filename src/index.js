import commandConsumer from './cmp/infrastructure/commandConsumer'
import ConsentManagementProvider from './cmp/application/ConsentManagementProvider'
import Log from './cmp/infrastructure/Log'

const log = new Log({console})
const cmp = new ConsentManagementProvider()

window.__cmp = window.__cmp || commandConsumer(log)(cmp)
