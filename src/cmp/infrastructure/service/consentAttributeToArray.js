/**
 * Converts a consentAttribute (vendorConsents or purposeConsents object) to
 * an array of consented ids for that object.
 * A consentAttribute object must be in the manner: {id1: boolean, id2: boolean,...}
 * @param consentAttribute
 */
export const consentAttributeToArray = (consentAttribute = {}) =>
  Object.entries(consentAttribute)
    .filter(entry => {
      return (
        entry[1] === true &&
        typeof parseInt(entry[0]) === 'number' &&
        !isNaN(parseInt(entry[0]))
      )
    })
    .map(entry => parseInt(entry[0]))
