const CMP_FRAME_ID = 'cmp-frame'
const IFRAME_STYLE_WIDTH = 0
const IFRAME_STYLE_HEIGHT = 0
const IFRAME_STYLE_BORDER = 0
const IFRAME_ATTRIBUTE_SANBOX = 'sandbox'
const IFRAME_ATTRIBUTE_SECURITY =
  'allow-same-origin allow-scripts allow-forms allow-top-navigation'

export default class IframeRegistry {
  constructor({dom}) {
    this._dom = dom
  }

  register({hostLocation}) {
    return Promise.resolve(CMP_FRAME_ID)
      .then(frameId => this._dom.getElementById(frameId))
      .then(optionalIframe =>
        this._createIfNotExist({
          dom: this._dom,
          iframe: optionalIframe,
          hostLocation
        })
      )
  }

  _createIfNotExist({dom, iframe, hostLocation}) {
    return new Promise((resolve, reject) => {
      if (!iframe) {
        iframe = dom.createElement('iframe')
        iframe.onload = () => resolve(iframe)
        iframe.onerror = () => reject(iframe)

        iframe.setAttribute('id', CMP_FRAME_ID)
        iframe.setAttribute('src', hostLocation)
        iframe.setAttribute(IFRAME_ATTRIBUTE_SANBOX, IFRAME_ATTRIBUTE_SECURITY)
        iframe.style.width = IFRAME_STYLE_WIDTH
        iframe.style.height = IFRAME_STYLE_HEIGHT
        iframe.style.border = IFRAME_STYLE_BORDER
        dom.body.appendChild(iframe)
      } else {
        resolve(iframe)
      }
    })
  }
}
