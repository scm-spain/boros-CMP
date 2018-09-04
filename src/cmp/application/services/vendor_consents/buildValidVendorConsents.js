/**
 * Converts a consentAttribute (vendorConsents or purposeConsents object) to
 * an array of consented ids for that object.
 * A consentAttribute object must be in the manner: {id1: boolean, id2: boolean,...}
 * @param consents Consents provided by the user
 * @param consents.vendorConsents<number, string> Vendor allowed or not
 * @param consents.purposeConsents<number, string> Purposes allowed or not
 */
import VendorConsentsFormatError from './VendorConsentsFormatError'
import VendorConsentsEntryError from './VendorConsentsEntryError'

const buildValidVendorConsents = consents =>
  Promise.resolve(consents)
    .then(filterValidFormat)
    .then(validConsents =>
      Promise.all([
        Object.entries(validConsents.vendorConsents)
          .filter(filterValidEntry)
          .filter(entry => entry[1])
          .map(entry => parseInt(entry[0])),
        Object.entries(validConsents.purposeConsents)
          .filter(filterValidEntry)
          .filter(entry => entry[1])
          .map(entry => parseInt(entry[0]))
      ]).then(([vendorConsents, purposeConsents]) => {
        return {
          vendorConsents: vendorConsents,
          purposeConsents: purposeConsents
        }
      })
    )

const filterValidFormat = consents =>
  Promise.resolve().then(
    () =>
      (consents.vendorConsents && consents.purposeConsents && consents) ||
      Promise.reject(new VendorConsentsFormatError({vendorConsents: consents}))
  )

const filterValidEntry = entry => {
  if (isNaN(entry[0])) {
    throw new VendorConsentsEntryError({entry})
  }

  if (typeof entry[1] !== 'boolean') {
    throw new VendorConsentsEntryError({entry})
  }

  return entry
}

export default buildValidVendorConsents
