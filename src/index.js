import initializeCMP from './cmp/infrastructure/cmpInitializer'
import createEvent from './cmp/infrastructure/createEvent'
import registerWindowCMP from './cmp/infrastructure/controller/windowCommunicationRegistry'
import registerIframeCommunication from './cmp/infrastructure/controller/iframeCommunicationRegistry'

initializeCMP({configuration: window.__cmp_config})
  .then(cmp =>
    Promise.all([
      registerWindowCMP({cmp}),
      registerIframeCommunication({cmp, window})
    ])
  )
  .then(() => createEvent({name: 'cmpReady'}))
