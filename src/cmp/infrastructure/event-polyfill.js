const customEventPolyfill = window => {
  if (typeof window.CustomEvent !== 'function') {
    const CustomEvent = (event, params) => {
      const eventParams = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      }
      let evt = document.createEvent('CustomEvent')
      evt.initCustomEvent(
        event,
        eventParams.bubbles,
        eventParams.cancelable,
        eventParams.detail
      )
      return evt
    }
    CustomEvent.prototype = window.Event.prototype
    window.CustomEvent = CustomEvent
  }
}

export default customEventPolyfill
