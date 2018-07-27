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
   * @returns {Promise<string>}
   */
  write({cookieName, value, maxAgeSeconds, path = '/'} = {}) {
    return Promise.resolve(maxAgeSeconds ? `;max-age=${maxAgeSeconds}` : '')
      .then(maxAge => `${cookieName}=${value};path=${path}${maxAge}`)
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
