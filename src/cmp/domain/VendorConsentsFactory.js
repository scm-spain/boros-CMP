/**
 * @interface
 */
export default class VendorConsentsFactory {
  createVendorConsents({consent, globalVendorList, allowedVendorIds}) {
    throw new Error('VendorConsentsFactory#createVendorConsents')
  }

  createFromEncodedConsent({encodedConsent, allowedVendorIds}) {
    throw new Error('VendorConsentsFactory#createFromEncodedConsent')
  }
}
