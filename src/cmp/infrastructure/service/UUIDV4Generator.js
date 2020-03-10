/**
 * @implements IdGenerator
 */
export default class UUIDV4Generator {
  constructor({uuidv4}) {
    this._uuidv4 = uuidv4
  }

  generate() {
    return this._uuidv4()
  }
}
