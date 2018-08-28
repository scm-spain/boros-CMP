export const globalVendorListVersionChangedObserverFactory = updateConsentVendorsService => ({
  payload,
  dispatcher
}) => updateConsentVendorsService.updateConsentVendorList(payload)
