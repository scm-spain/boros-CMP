/* eslint-disable no-undef */

const createEvent = ({window, name, detail = {}} = {}) => {
  window.document.dispatchEvent(new window.CustomEvent(name, {detail}))
}

export default createEvent
