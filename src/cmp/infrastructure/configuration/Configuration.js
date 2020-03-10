import {
  DEFAULT_CONSENT_LANGUAGE,
  DEFAULT_CONSENT_SCREEN,
  DEFAULT_GDPR_APPLIES,
  DEFAULT_GDPR_STORE_CONSENT_GLOBALLY,
  DEFAULT_LOG_LEVEL,
  DEFAULT_NEW_VENDORS_STATUS_OPTION,
  DEFAULT_VENDOR_LIST_HOST,
  DEFAULT_VENDOR_LIST_FILENAME
} from './defaults'
import {CMP_ID, CMP_VERSION} from './internals'

export default class Configuration {
  constructor({gdpr = {}, consent = {}, vendorList = {}, log = {}} = {}) {
    this._gdpr = {}
    this._gdpr.gdprApplies = gdpr.gdprApplies || DEFAULT_GDPR_APPLIES
    this._gdpr.storeConsentGlobally =
      gdpr.storeConsentGlobally || DEFAULT_GDPR_STORE_CONSENT_GLOBALLY
    this._gdpr.globalConsentLocation = gdpr.globalConsentLocation

    this._consent = {}
    this._consent.cmpId = CMP_ID
    this._consent.cmpVersion = CMP_VERSION
    this._consent.consentScreen =
      consent.consentScreen || DEFAULT_CONSENT_SCREEN
    this._consent.consentLanguage =
      consent.consentLanguage || DEFAULT_CONSENT_LANGUAGE
    this._consent.newVendorsStatusOption =
      consent.newVendorsStatusOption || DEFAULT_NEW_VENDORS_STATUS_OPTION
    this._consent.allowedVendorIds = consent.allowedVendorIds || undefined

    this._vendorList = {}
    this._vendorList.host = vendorList.host || DEFAULT_VENDOR_LIST_HOST
    this._vendorList.filename = DEFAULT_VENDOR_LIST_FILENAME

    this._log = {}
    this._log.level = log.level || DEFAULT_LOG_LEVEL
  }

  get gdpr() {
    return this._gdpr
  }

  get vendorList() {
    return this._vendorList
  }

  get consent() {
    return this._consent
  }

  get log() {
    return this._log
  }
}
