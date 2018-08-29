import {
  ALL_ALLOWED,
  ALL_DISALLOWED,
  CUSTOM_ALLOWED,
  getConsentVendorsContext
} from '../consent/consentValidation'

class NewVendorsStatusService {
  constructor({option = OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE} = {}) {
    this._option = option
  }
  getNewVendorsStatus({acceptedVendorIds, globalVendorIds, allowedVendorIds}) {
    return Promise.resolve()
      .then(() =>
        getConsentVendorsContext({
          acceptedVendorIds,
          globalVendorIds,
          allowedVendorIds
        })
      )
      .then(consentVendorsContext => {
        switch (this._option) {
          case OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE:
            return optionUseSameThanAll({consentVendorsContext, customIs: true})
          case OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE:
            return optionUseSameThanAll({
              consentVendorsContext,
              customIs: false
            })
          case OPTION_ALL_ALLOW:
            return optionAllAllow({consentVendorsContext})
          case OPTION_ALL_DISMISS:
            return optionAllDismiss({consentVendorsContext})
          default:
            return optionUseSameThanAll({consentVendorsContext, customIs: true})
        }
      })
  }
}

const optionUseSameThanAll = ({consentVendorsContext, customIs}) =>
  Promise.resolve().then(() => {
    switch (consentVendorsContext) {
      case ALL_ALLOWED:
        return true
      case ALL_DISALLOWED:
        return false
      case CUSTOM_ALLOWED:
        return customIs
    }
  })

const optionAllDismiss = ({consentVendorsContext}) => Promise.resolve(false)

const optionAllAllow = ({consentVendorsContext}) => Promise.resolve(true)

const OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE =
  'OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE'
const OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE =
  'OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE'
const OPTION_ALL_DISMISS = 'OPTION_ALL_DISMISS'
const OPTION_ALL_ALLOW = 'OPTION_ALL_ALLOW'

export {
  NewVendorsStatusService,
  OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE,
  OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE,
  OPTION_ALL_DISMISS,
  OPTION_ALL_ALLOW
}
