const fixJsdomPostMessageWithEventSource = ({origin, target}) => {
  target.postMessage = message => {
    const event = new target.MessageEvent('message', {
      data: message,
      source: origin
    })
    event.initEvent('message', false, false)
    setTimeout(() => {
      target.dispatchEvent(event)
    }, 0)
  }
}

export default fixJsdomPostMessageWithEventSource
