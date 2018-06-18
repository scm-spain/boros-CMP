/**
 * @interface
 */
export default class VendorRepository {
  getGlobalVendorList() {
    throw new Error('VendorRepository#getGlobalVendorList must be implemented')
  }
}
