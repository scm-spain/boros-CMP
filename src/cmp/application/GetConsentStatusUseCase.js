export default class GetConsentStatusUseCase {
  constructor({consentRepository}) {
    this._consentRepository = consentRepository
  }

  /**
   * Checks the consent acceptation status.
   * @return {Promise<string>}
   */
  getConsentStatus() {
    return Promise.resolve()
      .then(() => this._consentRepository.getConsent())
      .then(
        consent =>
          consent ? CONSENT_STATUS_ACCEPTED : CONSENT_STATUS_NOT_ACCEPTED
      )
  }
}

const CONSENT_STATUS_NOT_ACCEPTED = 'NOT_ACCEPTED'
const CONSENT_STATUS_ACCEPTED = 'ACCEPTED'
