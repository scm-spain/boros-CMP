/* eslint-disable no-undef */
import initializeCMP from './cmp/infrastructure/cmpInitializer'
import createEvent from './cmp/infrastructure/createEvent'

initializeCMP({
  configuration: window.__cmp_config,
  cmpVersion: CMP_VERSION
})
  .then(cmp => (window.__cmp = cmp))
  .then(() => createEvent({name: 'cmpReady'}))
