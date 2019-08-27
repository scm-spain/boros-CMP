export default class HttpTranslationVendorListRepository {
  constructor({fetcher, vendorListRepository, consentLanguage} = {}) {
    this._fetcher = fetcher
    this._vendorListRepository = vendorListRepository
    this._consentLanguage = consentLanguage
    this._acceptedLanguage = ACCEPTED_LANGUAGES.has(this._consentLanguage)
  }

  getGlobalVendorList({vendorListVersion} = {}) {
    return Promise.all([
      this._vendorListRepository.getGlobalVendorList({vendorListVersion}),
      this._acceptedLanguage ? this._getTranslation({vendorListVersion}) : null
    ]).then(
      ([vendorList, translation]) =>
        translation
          ? this._mergeTranslation({vendorList, translation})
          : vendorList
    )
  }

  _getTranslation({vendorListVersion}) {
    return Promise.resolve()
      .then(
        () =>
          `${PURPOSES_HOST}/${
            vendorListVersion ? 'v-' + vendorListVersion + '/' : ''
          }${PURPOSES_FILENAME}-${this._consentLanguage}${PURPOSES_EXTENSION}`
      )
      .then(url => this._fetcher(url))
      .then(fetchResponse => (fetchResponse.ok ? fetchResponse.json() : null))
  }

  _mergeTranslation({vendorList, translation}) {
    return Promise.resolve().then(() => {
      vendorList.purposes = translation.purposes
      vendorList.features = translation.features
      return vendorList
    })
  }
}

const ACCEPTED_LANGUAGES = new Set([
  'bg',
  'cs',
  'da',
  'de',
  'el',
  'es',
  'et',
  'fi',
  'fr',
  'ga',
  'hr',
  'hu',
  'it',
  'lt',
  'lv',
  'mt',
  'nl',
  'pl',
  'pt',
  'ro',
  'sk',
  'sl',
  'sv'
])
const PURPOSES_HOST = 'https://vendorlist.consensu.org'
const PURPOSES_FILENAME = 'purposes'
const PURPOSES_EXTENSION = '.json'
