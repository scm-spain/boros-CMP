/* eslint-disable no-undef */
import './cmp/infrastructure/event-polyfill'
import Bootstrap from './cmp/infrastructure/bootstrap'
Bootstrap.context({window, config: window.__cmp_config})
