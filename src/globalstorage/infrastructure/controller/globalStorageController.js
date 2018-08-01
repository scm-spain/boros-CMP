const globalStorageControllerRegistry = ({
  window,
  readCookieUseCase,
  writeCookieUseCase
}) =>
  Promise.resolve([
    Promise.resolve(readCookieCommandFactory({readCookieUseCase})),
    Promise.resolve(writeCookieCommandFactory({writeCookieUseCase}))
  ]).then(([readCookieCommand, writeCookieCommand]) => {
    window.addEventListener('message', event => {
      if (event && event.data) {
        if (event.data.__readCookie) {
          readCookieCommand({
            input: event.data.__readCookie,
            source: event.source
          })
        } else if (event.data.__writeCookie) {
          writeCookieCommand({
            input: event.data.__writeCookie,
            source: event.source
          })
        }
      }
    })
  })

/**
 * input:
 * - name
 * - callId
 * source: (event source)
 *
 * @param readCookieUseCase
 */
const readCookieCommandFactory = ({readCookieUseCase}) => ({input, source}) =>
  Promise.resolve()
    .then(() => readCookieUseCase.readCookie({name: input.name}))
    .then(value => ({
      __cookieValue: {
        exist: value !== undefined,
        value: value,
        callId: input.callId
      }
    }))
    .catch(e => ({
      __cookieValue: {
        exist: false,
        value: undefined,
        error: e.message
      }
    }))
    .then(response => source.postMessage(response, '*'))

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
const writeCookieCommandFactory = ({writeCookieUseCase}) => ({input, source}) =>
  Promise.resolve()
    .then(() =>
      writeCookieUseCase.writeCookie({
        name: input.name,
        value: input.value,
        path: input.path,
        maxAgeSeconds: input.maxAgeSeconds
      })
    )
    .then(() => ({
      __cookieStored: {
        success: true,
        callId: input.callId
      }
    }))
    .catch(e => ({
      __cookieStored: {
        success: false,
        callId: input.callId,
        error: e.message
      }
    }))
    .then(response => source.postMessage(response, '*'))

export default globalStorageControllerRegistry
