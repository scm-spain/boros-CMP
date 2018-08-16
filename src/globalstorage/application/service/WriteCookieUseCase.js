export default class WriteCookieUseCase {
  constructor({cookieHandler, domain} = {}) {
    this._setCookieValue = setCookieValue({
      cookieHandler,
      domain
    })
  }

  writeCookie({name, value, path, maxAgeSeconds}) {
    return Promise.resolve().then(() =>
      this._setCookieValue({name, value, path, maxAgeSeconds})
    )
  }
}

const setCookieValue = ({cookieHandler, domain}) => ({
  name,
  value,
  path,
  maxAgeSeconds
} = {}) =>
  cookieHandler.write({
    cookieName: name,
    cookieDomain: domain,
    value,
    path,
    maxAgeSeconds
  })
