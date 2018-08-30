/**
 * @interface
 */
export default class VendorListRepository {
  getGlobalVendorList({vendorListVersion}) {
    throw new Error('VendorListRepository#getGlobalVendorList')
  }
}
