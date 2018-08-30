/**
 * @class
 * @implements ConsentRepository
 */
import {
  READ_CONSENT_COMMAND,
  WRITE_CONSENT_COMMAND
} from '../configuration/iframeConsentCommands'

export default class IframeConsentRepository {
  constructor({iframeCommunicationClient, consentFactory}) {
    this._iframeCommunicationClient = iframeCommunicationClient
    this._consentFactory = consentFactory
  }

  /**
   *
   * @returns {Promise<ConsentString | undefined>}
   */
  getConsent() {
    return Promise.resolve()
      .then(() =>
        this._iframeCommunicationClient.request({
          command: READ_CONSENT_COMMAND
        })
      )
      .then(
        encodedConsent =>
          (encodedConsent &&
            this._consentFactory.createConsent({
              encodedConsent
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
