/**
 * Return ALL_ALLOWED, ALL_DISALLOWED, CUSTOM_ALLOWED depending on the consent acceptedVendorIds
 * to have all the globalVendorList vendors (accepted in the allowedVendorList) to be all
 * allowed, none allowed or some vendors allowed and others not, respectively.
 * Note that ALL_ALLOWED may mean that ALL the vendors from the 'allowedVendorIds'
 * were allowed (so they are not the 'all' from the global vendor list)
 * @param acceptedVendorIds
 * @param globalVendorList
 * @param allowedVendorIds
 */
const getConsentVendorsContext = ({
  acceptedVendorIds,
  globalVendorIds,
  allowedVendorIds
}) =>
  Promise.resolve()
    .then(() =>
      globalVendorIds.filter(
        id => !allowedVendorIds || allowedVendorIds.indexOf(id) >= 0
      )
    )
    .then(allowedGlobalVendorIds =>
      Promise.resolve(
        allowedGlobalVendorIds.filter(id => acceptedVendorIds.indexOf(id) >= 0)
          .length
      ).then(count => {
        if (count === 0) return ALL_DISALLOWED
        if (count === allowedGlobalVendorIds.length) return ALL_ALLOWED
        return CUSTOM_ALLOWED
      })
    )

const ALL_ALLOWED = 1
const ALL_DISALLOWED = -1
const CUSTOM_ALLOWED = 0

export {getConsentVendorsContext, ALL_ALLOWED, ALL_DISALLOWED, CUSTOM_ALLOWED}
