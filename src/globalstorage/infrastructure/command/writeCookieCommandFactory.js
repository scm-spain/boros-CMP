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
const VENDOR_CONSENT_COOKIE_NAME = 'euconsent'
const writeCookieCommandFactory = ({writeCookieUseCase}) => ({input}) =>
  Promise.resolve()
    .then(() =>
      writeCookieUseCase.writeCookie({
        name: VENDOR_CONSENT_COOKIE_NAME,
        value: input.value,
        path: input.path,
        maxAgeSeconds: input.maxAgeSeconds
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
