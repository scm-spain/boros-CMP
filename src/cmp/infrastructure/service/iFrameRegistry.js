const CMP_FRAME_ID = 'cmp-frame'
const IFRAME_STYLE_WIDTH = 0
const IFRAME_STYLE_HEIGHT = 0
const IFRAME_STYLE_BORDER = 0
const IFRAME_ATTRIBUTE_SANBOX = 'sandbox'
const IFRAME_ATTRIBUTE_SECURITY =
  'allow-same-origin allow-scripts allow-forms allow-top-navigation'

const iFrameRegistryFactory = dom => hostLocation =>
  Promise.resolve(CMP_FRAME_ID)
    .then(frameId => dom.getElementById(frameId))
    .then(optionalIframe => createIfNotExist(dom)(optionalIframe)(hostLocation))

const createIfNotExist = dom => iframe => iframeUrl =>
  new Promise((resolve, reject) => {
    if (!iframe) {
      iframe = dom.createElement('iframe')
      iframe.onload = () => resolve(iframe)
      iframe.onerror = () => reject(iframe)

      iframe.setAttribute('id', CMP_FRAME_ID)
      iframe.setAttribute('src', iframeUrl)
      iframe.setAttribute(IFRAME_ATTRIBUTE_SANBOX, IFRAME_ATTRIBUTE_SECURITY)
      iframe.style.width = IFRAME_STYLE_WIDTH
      iframe.style.height = IFRAME_STYLE_HEIGHT
      iframe.style.border = IFRAME_STYLE_BORDER
      dom.body.appendChild(iframe)
    } else {
      resolve(iframe)
    }
  })

export default iFrameRegistryFactory
