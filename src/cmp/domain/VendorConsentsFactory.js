/**
 * @interface
 */
export default class VendorConsentsFactory {
  createFromConsentString({encodedConsent, allowedVendorIds}) {
    throw new Error('VendorConsentsFactory#createFromEncodedConsent')
  }
}
