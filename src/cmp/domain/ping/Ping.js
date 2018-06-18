export default class Ping {
  /**
   * Creates a Ping
   *
   * @param {Boolean} gdprAppliesGlobally
   * @param {Boolean} cmpLoaded
   */
  constructor({gdprAppliesGlobally, cmpLoaded}) {
    this._gdprAppliesGlobally = gdprAppliesGlobally
    this._cmpLoaded = cmpLoaded
  }

  get gdprAppliesGlobally() {
    return this._gdprAppliesGlobally
  }

  get cmpLoaded() {
    return this._cmpLoaded
  }
}
