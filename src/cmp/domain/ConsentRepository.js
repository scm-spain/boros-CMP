/**
 * @interface
 */
export default class ConsentRepository {
  getConsent() {
    throw new Error('ConsentRepository#getConsent')
  }

  saveConsent({consent}) {
    throw new Error('ConsentRepository#saveConsent')
  }
}
