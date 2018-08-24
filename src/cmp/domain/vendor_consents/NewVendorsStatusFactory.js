import {
  ALL_ALLOWED,
  ALL_DISALLOWED,
  CUSTOM_ALLOWED
} from '../consent/consentValidation'

export default class NewVendorsStatusFactory {
  constructor({option = OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE} = {}) {
    this._option = option
  }
  from({acceptationStatus}) {
    return Promise.resolve().then(() => {
      switch (this._option) {
        case OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE:
          return optionUseSameThanAll({acceptationStatus, customIs: true})
        case OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE:
          return optionUseSameThanAll({acceptationStatus, customIs: false})
        case OPTION_ALL_ALLOW:
          return optionAllAllow({acceptationStatus})
        case OPTION_ALL_DISMISS:
          return optionAllDismiss({acceptationStatus})
        default:
          return optionUseSameThanAll({acceptationStatus, customIs: true})
      }
    })
  }
}

const optionUseSameThanAll = ({acceptationStatus, customIs}) =>
  Promise.resolve().then(() => {
    switch (acceptationStatus) {
      case ALL_ALLOWED:
        return true
      case ALL_DISALLOWED:
        return false
      case CUSTOM_ALLOWED:
        return customIs
    }
  })

const optionAllDismiss = ({acceptationStatus}) => Promise.resolve(false)

const optionAllAllow = ({acceptationStatus}) => Promise.resolve(true)

const OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE =
  'OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE'
const OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE =
  'OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE'
const OPTION_ALL_DISMISS = 'OPTION_ALL_DISMISS'
const OPTION_ALL_ALLOW = 'OPTION_ALL_ALLOW'
