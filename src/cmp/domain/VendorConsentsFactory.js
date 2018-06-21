/**
 * @interface
 */
export default class VendorConsentsFactory {
  createVendorConsents({consent, globalVendorList, allowedVendorIds}) {
    throw new Error(
      'VendorConsentsFactory#createVendorConsents must be implemented'
    )
  }
}
