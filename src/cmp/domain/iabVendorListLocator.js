const latestVendorListLocator = () =>
  'https://vendorlist.consensu.org/vendorlist.json'

const versionVendorListLocator = ({vendorListVersion}) =>
  `https://vendorlist.consensu.org/v-${vendorListVersion}/vendorlist.json`

export {latestVendorListLocator, versionVendorListLocator}
