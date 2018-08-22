const CMP_LOCATOR_NAME = '__cmpLocator'

const registerCmpLocator = ({window}) => {
  return Promise.resolve().then(() => {
    if (!window.frames[CMP_LOCATOR_NAME]) {
      const iFrame = window.document.createElement('iframe')
      iFrame.style.display = 'none'
      iFrame.name = CMP_LOCATOR_NAME
      window.document.body.appendChild(iFrame)
    }
  })
}

export default registerCmpLocator
