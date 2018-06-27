/**
 * @interface
 */
export default class VendorConsentsRepository {
  getVendorConsents({allowedVendorIds}) {
    throw new Error('VendorConsentsRepository#getVendorConsents')
  }

  saveVendorConsents() {
    throw new Error('VendorConsentsRepository#saveVendorConsents')
  }
}
