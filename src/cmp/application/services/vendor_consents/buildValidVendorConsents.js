/**
 * Converts a consentAttribute (vendorConsents or purposeConsents object) to
 * an array of consented ids for that object.
 * A consentAttribute object must be in the manner: {id1: boolean, id2: boolean,...}
 * @param consentAttribute
 */
const buildValidVendorConsents = consents =>
  Promise.all([
    Object.entries(consents.vendorConsents)
      .filter(filterValidEntry)
      .filter(entry => entry[1])
      .map(entry => parseInt(entry[0])),
    Object.entries(consents.purposeConsents)
      .filter(filterValidEntry)
      .filter(entry => entry[1])
      .map(entry => parseInt(entry[0]))
  ]).then(([vendorConsents, purposeConsents]) => {
    return {
      vendorConsents: vendorConsents,
      purposeConsents: purposeConsents
    }
  })

const filterValidEntry = entry => {
  if (isNaN(entry[0])) throw new Error('entry key is not a number')
  if (typeof entry[1] !== 'boolean')
    throw new Error('entry value is not a boolean')

  return entry
}

export default buildValidVendorConsents
