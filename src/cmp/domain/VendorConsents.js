/**
 * This object contains the global purposes, and vendors, consented to by the user:
{
  metadata: [base64url-encoded](https://tools.ietf.org/html/rfc4648#section-5) string (header data from the vendor consent format, as described below),
  gdprApplies: *Boolean*,
  hasGlobalScope: *Boolean,  // true if the vendor consent data is retrieved from the global cookie, false if a publisher-specific (or publisher-group-specific) cookie*
  purposeConsents: {
    *purposeId*: *consentBoolean*,
    ?
  },
  vendorConsents: {
    *vendorId* : *c**onsentBoolean*,
    ?
  },
}

 where vendorId and purposeId are the keys and *consentBoolean *are the values for the consent (false="No Consent?, true=?Consent?). The *gdprApplies *field will be true if the user is determined (by geo-IP lookup) to be in the EU, or the publisher has configured the CMP (via a CMP-specific method not specified by this spec) that they are a EU publisher and thus the CMP UI should be shown for everyone. The metadata will be the base64url-encoded value of the following "header" information described in the cookie format:
 -Cookie Version
 -Created Timestamp
 -Last Updated Timestamp
 -Cmp Id
 -Cmp Version
 -Consent Screen
 -Vendor List Version
 -Publisher Purposes Version (for the PublisherConsent metadata only)
 */
export default class VendorConsents {
  constructor({
    metadata,
    gdrpApplies,
    hasGlobalScope,
    purposeConsents,
    vendorConsents
  }) {
    this._metadata = metadata
    this._gdrpApplies = gdrpApplies
    this._hasGlobalScope = hasGlobalScope
    this._purposeConsents = purposeConsents
    this._vendorConsents = vendorConsents
  }

  get metadata() {
    return this._metadata
  }

  get gdrpApplies() {
    return this._gdrpApplies
  }

  get hasGlobalScope() {
    return this._hasGlobalScope
  }

  get purposeConsents() {
    return this._purposeConsents
  }

  get vendorConsents() {
    return this._vendorConsents
  }
}
