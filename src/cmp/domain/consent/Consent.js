export default class Consent {
  /**
   * Creates a new Consent
   *
   * @param {String} id
   * @param {Boolean} isGranted - True if it is granted
   */
  constructor({id, isGranted}) {
    this._id = id
    this._isGranted = isGranted
  }

  get id() {
    return this._id
  }

  get isGranted() {
    return this._isGranted
  }
}
