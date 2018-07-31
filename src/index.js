import initializeCMP from './cmp/infrastructure/cmpInitializer'
import createEvent from './cmp/infrastructure/createEvent'
import getCmpVersion from './cmp/infrastructure/getCmpVersion'

initializeCMP({
  configuration: window.__cmp_config,
  cmpVersion: getCmpVersion()
})
  .then(cmp => (window.__cmp = cmp))
  .then(() => createEvent({name: 'cmpReady'}))
