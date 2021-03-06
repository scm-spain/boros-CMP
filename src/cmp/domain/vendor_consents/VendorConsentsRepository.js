/**
 * @interface
 */
export default class VendorConsentsRepository {
  getVendorConsents({allowedVendorIds}) {
    throw new Error('VendorConsentsRepository#getVendorConsents')
  }

  saveVendorConsents({vendorConsents, purposeConsents}) {
    throw new Error('VendorConsentsRepository#saveVendorConsents')
  }
}
