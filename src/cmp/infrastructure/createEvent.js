/* eslint-disable no-undef */

const createEvent = ({window, name, detail = {}} = {}) => {
  window.document.dispatchEvent(new CustomEvent(name, {detail}))
}

export default createEvent
