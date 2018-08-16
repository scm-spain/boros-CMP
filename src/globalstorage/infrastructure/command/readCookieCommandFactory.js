/**
 * input:
 * - name
 * - callId
 * source: (event source)
 *
 * @param readCookieUseCase
 */
const VENDOR_CONSENT_COOKIE_NAME = 'euconsent'
const readCookieCommandFactory = ({readCookieUseCase}) => ({input}) =>
  Promise.resolve()
    .then(() =>
      readCookieUseCase.readCookie({name: VENDOR_CONSENT_COOKIE_NAME})
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
        returnValue: e.message,
        callId: input.callId
      }
    }))

export default readCookieCommandFactory
