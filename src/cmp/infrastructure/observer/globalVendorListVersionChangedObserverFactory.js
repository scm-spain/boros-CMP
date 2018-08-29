export const globalVendorListVersionChangedObserverFactory = ({
  updateConsentVendorsService
}) => ({payload, dispatcher}) => {
  updateConsentVendorsService.updateConsentVendorList({
    consentAcceptedVendors: payload.vendorConsents,
    consentAcceptedPurposes: payload.purposeConsents,
    consentGlobalVendorListVersion: payload.oldVendorListVersion,
    allowedVendorIds: payload.allowedVendorIds,
    currentGlobalVendorList: payload.newGlobalVendorList
  })
}
