import initializeCMP from './cmp/infrastructure/cmpInitializer'
import createEvent from './cmp/infrastructure/createEvent'

initializeCMP()
  .then(cmp => (window.__cmp = cmp))
  .then(() => createEvent({name: 'cmpReady'}))
