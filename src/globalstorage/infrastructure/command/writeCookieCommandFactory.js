/**
 * input:
 * - name
 * - value
 * - path
 * - maxAgeSeconds
 * - callId
 * source: (event source)
 *
 * @param writeCookieUseCase
 */

import {
  VENDOR_CONSENT_COOKIE_DEFAULT_PATH,
  VENDOR_CONSENT_COOKIE_MAX_AGE,
  VENDOR_CONSENT_COOKIE_NAME,
  VENDOR_CONSENT_COOKIE_SAME_SITE_GLOBAL_VALUE,
  VENDOR_CONSENT_COOKIE_SECURE_GLOBAL_VALUE
} from '../../../cmp/infrastructure/configuration/cookie'

const writeCookieCommandFactory = ({writeCookieUseCase}) => ({input}) =>
  Promise.resolve()
    .then(() =>
      writeCookieUseCase.writeCookie({
        name: VENDOR_CONSENT_COOKIE_NAME,
        value: input.value,
        path: VENDOR_CONSENT_COOKIE_DEFAULT_PATH,
        maxAgeSeconds: VENDOR_CONSENT_COOKIE_MAX_AGE,
        sameSite: VENDOR_CONSENT_COOKIE_SAME_SITE_GLOBAL_VALUE,
        secure: VENDOR_CONSENT_COOKIE_SECURE_GLOBAL_VALUE
      })
    )
    .then(value => ({
      __cmpReturn: {
        success: true,
        returnValue: value,
        callId: input.callId
      }
    }))
    .catch(e => ({
      __cmpReturn: {
        success: false,
        returnValue: e,
        callId: input.callId
      }
    }))

export default writeCookieCommandFactory
