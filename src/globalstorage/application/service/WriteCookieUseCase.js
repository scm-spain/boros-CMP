export default class WriteCookieUseCase {
  constructor({cookieHandler, domain} = {}) {
    this._setCookieValue = setCookieValue({
      cookieHandler,
      domain
    })
  }

  writeCookie({name, value, path, maxAgeSeconds, sameSite, secure}) {
    return Promise.resolve().then(() =>
      this._setCookieValue({name, value, path, maxAgeSeconds, sameSite, secure})
    )
  }
}

const setCookieValue = ({cookieHandler, domain}) => ({
  name,
  value,
  path,
  maxAgeSeconds,
  sameSite,
  secure
} = {}) =>
  cookieHandler.write({
    cookieName: name,
    cookieDomain: domain,
    value,
    path,
    maxAgeSeconds,
    sameSite,
    secure
  })
