import iFrameRegistryFactory from './iFrameRegistry'
import registerIframeCommunication from '../controller/iframeCommunicationRegistry'

const globalConsentStorageFactory = window => globalConsentLocation =>
  Promise.all([
    iFrameRegistryFactory(window)(globalConsentLocation),
    registerIframeCommunication({window})
  ])

export default globalConsentStorageFactory
