/* eslint-disable no-undef */
import customEventPolyfill from './event-polyfill'

const createEvent = ({window, name, detail = {}} = {}) => {
  customEventPolyfill(window)
  window.document.dispatchEvent(new CustomEvent(name, {detail}))
}

export default createEvent
