/**
 * @interface
 */
export default class ConsentFactory {
  createConsent({encodedConsent, globalVendorList}) {
    throw new Error('ConsentFactory#createConsent')
  }
}
