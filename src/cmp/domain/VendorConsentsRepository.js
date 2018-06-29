/**
 * @interface
 */
export default class VendorConsentsRepository {
  getVendorConsents({allowedVendorIds}) {
    throw new Error('VendorConsentsRepository#getVendorConsents')
  }

  saveVendorConsents({vendorConsents}) {
    throw new Error('VendorConsentsRepository#saveVendorConsents')
  }
}
