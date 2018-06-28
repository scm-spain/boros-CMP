/**
 * @interface
 */
export default class ConsentFactory {
  createConsent({consentString, globalVendorList}) {
    throw new Error('ConsentFactory#createConsent must be implemented')
  }
}
