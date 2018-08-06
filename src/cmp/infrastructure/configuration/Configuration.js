import {
  DEFAULT_CONSENT_LANGUAGE,
  DEFAULT_CONSENT_SCREEN,
  DEFAULT_GDPR_APPLIES,
  DEFAULT_GDPR_STORE_CONSENT_GLOBALLY,
  DEFAULT_GDPR_GLOBAL_CONSENT_LOCATION,
  DEFAULT_LOG_LEVEL,
  DEFAULT_VENDOR_LIST_LATEST_LOCATOR,
  DEFAULT_VENDOR_LIST_VERSION_LOCATOR
} from './defaults'
import {CMP_ID} from './internals'

export default class Configuration {
  constructor({
    gdpr = {},
    consent = {},
    httpVendorList = {},
    log = {},
    cmpVersion
  } = {}) {
    this._gdpr = {}
    this._gdpr.gdprApplies = gdpr.gdprApplies || DEFAULT_GDPR_APPLIES
    this._gdpr.storeConsentGlobally =
      gdpr.storeConsentGlobally || DEFAULT_GDPR_STORE_CONSENT_GLOBALLY

    this._gdpr.globalConsentLocation =
      gdpr.globalConsentLocation || DEFAULT_GDPR_GLOBAL_CONSENT_LOCATION

    this._consent = {}
    this._consent.cmpId = CMP_ID
    this._consent.cmpVersion = cmpVersion
    this._consent.consentScreen =
      consent.consentScreen || DEFAULT_CONSENT_SCREEN
    this._consent.consentLanguage =
      consent.consentLanguage || DEFAULT_CONSENT_LANGUAGE

    this._httpVendorList = {}
    this._httpVendorList.latestLocator =
      httpVendorList.latestLocator || DEFAULT_VENDOR_LIST_LATEST_LOCATOR
    this._httpVendorList.versionLocator =
      httpVendorList.versionLocator || DEFAULT_VENDOR_LIST_VERSION_LOCATOR

    this._log = {}
    this._log.level = log.level || DEFAULT_LOG_LEVEL
  }
  get gdpr() {
    return this._gdpr
  }
  get httpVendorList() {
    return this._httpVendorList
  }
  get consent() {
    return this._consent
  }
  get log() {
    return this._log
  }
}
