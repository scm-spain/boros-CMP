import UnexistingConsentDataError from './UnexistingConsentDataError'

const filterConsentMustExist = consent => {
  if (!consent) {
    throw new UnexistingConsentDataError()
  }
  return consent
}

export default filterConsentMustExist
