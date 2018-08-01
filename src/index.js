/* eslint-disable no-undef */
import initializeCMP from './cmp/infrastructure/cmpInitializer'
import createEvent from './cmp/infrastructure/createEvent'
import registerWindowCMP from './cmp/infrastructure/controller/windowCommunicationRegistry'
import registerIframeCommunication from './cmp/infrastructure/controller/iframeCommunicationRegistry'

initializeCMP({
  configuration: window.__cmp_config,
  cmpVersion: CMP_VERSION
})
  .then(cmp =>
    Promise.all([
      registerWindowCMP({cmp, window}),
      registerIframeCommunication({cmp, window}) // TODO: should write the __cmpLocator
      // TODO: should register the iframe for global cooke storage if configuration tells so
    ])
  )
  .then(() => createEvent({name: 'cmpReady'}))
