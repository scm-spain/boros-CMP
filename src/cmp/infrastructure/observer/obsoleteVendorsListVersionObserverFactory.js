export const obsoleteVendorsListVersionObserverFactory = updateConsentVendorsService => ({
  payload,
  dispatcher
}) => updateConsentVendorsService.updateConsentVendorList(payload)
