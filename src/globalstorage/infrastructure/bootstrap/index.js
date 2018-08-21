import globalStorage from '../../application/globalStorage'
import CookieHandler from '../../../cmp/infrastructure/service/CookieHandler'
import ReadCookieUseCase from '../../application/service/ReadCookieUseCase'
import WriteCookieUseCase from '../../application/service/WriteCookieUseCase'

const bootstrap = window =>
  Promise.resolve(window).then(window =>
    Promise.resolve(new CookieHandler({dom: window.document})).then(
      cookieHandler =>
        Promise.all([
          new ReadCookieUseCase({cookieHandler}),
          new WriteCookieUseCase({
            cookieHandler,
            domain: window.location.hostname
          })
        ]).then(([readCookieUseCase, writeCookieUseCase]) =>
          globalStorage({
            window,
            readCookieUseCase,
            writeCookieUseCase
          })
        )
    )
  )
export default bootstrap
