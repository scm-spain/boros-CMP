import initializeCMP from './cmp/infrastructure/cmpInitializer'
import createEvent from './cmp/infrastructure/createEvent'

initializeCMP({configuration: window.__cmp_config})
  .then(cmp => (window.__cmp = cmp))
  .then(() => createEvent({name: 'cmpReady'}))
