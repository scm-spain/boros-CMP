export const globalVendorListVersionChangedObserverFactory = ({
  updateConsentVendorsService
}) => ({payload, dispatcher}) => {
  updateConsentVendorsService.updateConsentVendorList({
    consentAcceptedVendors: payload.vendorConsents,
    consentAcceptedPurposes: payload.purposeConsents,
    allowedVendorIds: payload.allowedVendorIds,
    newGlobalVendorList: payload.newGlobalVendorList,
    oldGlobalVendorList: payload.oldGlobalVendorList
  })
}
