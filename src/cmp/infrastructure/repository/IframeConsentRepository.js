/**
 * @class
 * @implements ConsentRepository
 */
import {
  READ_CONSENT_COMMAND,
  WRITE_CONSENT_COMMAND
} from '../configuration/iframeConsentCommands'

export default class IframeConsentRepository {
  constructor({
    iframeCommunicationClient,
    vendorListRepository,
    consentFactory
  }) {
    this._iframeCommunicationClient = iframeCommunicationClient
    this._vendorListRepository = vendorListRepository
    this._consentFactory = consentFactory
  }

  /**
   *
   * @returns {Promise<ConsentString | undefined>}
   */
  getConsent() {
    return Promise.resolve()
      .then(() =>
        Promise.all([
          this._iframeCommunicationClient.request({
            command: READ_CONSENT_COMMAND
          }),
          this._vendorListRepository.getGlobalVendorList()
        ])
      )
      .then(
        ([encodedConsent, globalVendorList]) =>
          (encodedConsent &&
            this._consentFactory.createConsent({
              encodedConsent,
              globalVendorList
            })) ||
          undefined
      )
  }

  saveConsent({consent}) {
    return Promise.resolve()
      .then(() => consent.getConsentString())
      .then(encodedConsent =>
        this._iframeCommunicationClient.request({
          command: WRITE_CONSENT_COMMAND,
          params: {
            value: encodedConsent
          }
        })
      )
  }
}
