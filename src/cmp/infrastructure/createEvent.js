/* eslint-disable no-undef */
import './event-polyfill'

const createEvent = ({name, detail = {}} = {}) => {
  window.document.dispatchEvent(new CustomEvent(name, {detail}))
}

export default createEvent
