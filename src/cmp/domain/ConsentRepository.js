/**
 * @interface
 */
export default class ConsentRepository {
  getConsentData() {
    throw new Error('ConsentRepository#getConsentData must be implemented')
  }
}
