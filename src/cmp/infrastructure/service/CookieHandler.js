export default class CookieHandler {
  constructor({dom}) {
    this._dom = dom
  }

  /**
   * Write a valid string cookie value specified by [IETF RFC 2965]
   * @param {string} cookieName
   * @param {string} value
   * @param {number} maxAgeSeconds
   * @param {string} path
   * @param {string} domain
   * @param {string} sameSite
   * @param {string} secure
   * @returns {Promise<string>}
   */
  write = ({
    cookieName,
    value,
    maxAgeSeconds,
    path = '/',
    cookieDomain,
    sameSite,
    secure
  } = {}) => {
    return Promise.all([
      Promise.resolve(maxAgeSeconds ? `;max-age=${maxAgeSeconds}` : ''),
      Promise.resolve(cookieDomain ? `;domain=${cookieDomain}` : ''),
      Promise.resolve(secure ? `;${secure}` : '')
    ])
      .then(
        ([maxAge, domain, secure]) =>
          `${cookieName}=${value}${domain};path=${path}${maxAge};SameSite=${sameSite}${secure}`
      )
      .then(cookieValue => (this._dom.cookie = cookieValue))
  }

  /**
   * Read cookies by provided name and return value associated
   * @param cookieName
   * @returns {Promise<string | undefined>}
   */
  read({cookieName}) {
    return Promise.resolve(
      `; ${this._dom.cookie}`.split(`; ${cookieName}=`)
    ).then(
      cookieParts =>
        (cookieParts.length === 2 &&
          cookieParts
            .pop()
            .split(';')
            .shift()) ||
        undefined
    )
  }
}
