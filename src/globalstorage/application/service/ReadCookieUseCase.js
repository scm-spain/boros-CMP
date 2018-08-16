export default class ReadCookieUseCase {
  constructor({cookieHandler} = {}) {
    this._getCookieValue = getCookieValue({
      cookieHandler
    })
  }

  readCookie({name}) {
    return Promise.resolve().then(() => this._getCookieValue({name}))
  }
}

const getCookieValue = ({cookieHandler}) => ({name}) =>
  cookieHandler.read({cookieName: name})
