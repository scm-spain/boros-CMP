import {expect} from 'chai'
import {JSDOM} from 'jsdom'
import CookieHandler from '../../../../cmp/infrastructure/service/CookieHandler'

describe('CookieHandler', () => {
  describe('Given a cookieName, value and params', () => {
    it('Should be written a cookie in the browser', done => {
      const givenCookieName = 'cookieMonster'
      const givenCookieValue = 'nyam_nyam'
      const givenCookieMaxAgeSeconds = 100
      const givenSameSite = 'lax'
      const givenDOM = new JSDOM(
        '<!DOCTYPE html><div id="fear">I\'m BATMAN!</div>'
      ).window.document

      const cookieHandler = new CookieHandler({
        dom: givenDOM
      })

      const expectedCookieString = `${givenCookieName}=${givenCookieValue};path=/;max-age=${givenCookieMaxAgeSeconds};SameSite=${givenSameSite}`
      const expectedCookieKeyValue = `${givenCookieName}=${givenCookieValue}`

      cookieHandler
        .write({
          cookieName: givenCookieName,
          value: givenCookieValue,
          maxAgeSeconds: givenCookieMaxAgeSeconds,
          sameSite: givenSameSite
        })
        .then(cookieString => {
          expect(cookieString).to.equal(expectedCookieString)
          expect(givenDOM.cookie).to.equal(expectedCookieKeyValue)
          done()
        })
        .catch(error => done(new Error(error)))
    })
  })

  describe('Given a cookieName', () => {
    it('Should return a value associated', done => {
      const givenCookieName = 'cookieMonster'
      const givenDOM = new JSDOM(
        '<!DOCTYPE html><div id="fear">I\'m BATMAN!</div>'
      ).window.document

      givenDOM.cookie = 'cookieMonster=nyam_nyam'

      const cookieHandler = new CookieHandler({
        dom: givenDOM
      })

      const expectedCookieValue = 'nyam_nyam'

      cookieHandler
        .read({cookieName: givenCookieName})
        .then(cookieValue => {
          expect(cookieValue).to.equal(expectedCookieValue)
          done()
        })
        .catch(error => done(new Error(error)))
    })
  })

  describe('Given a non exist cookieName', () => {
    it('Should return undefined', done => {
      const givenCookieName = 'batman'
      const givenDOM = new JSDOM(
        '<!DOCTYPE html><div id="fear">I\'m BATMAN!</div>'
      ).window.document

      givenDOM.cookie = 'cookieMonster=nyam_nyam'

      const cookieHandler = new CookieHandler({
        dom: givenDOM
      })

      cookieHandler
        .read({cookieName: givenCookieName})
        .then(cookieValue => {
          expect(cookieValue).to.be.undefined
          done()
        })
        .catch(error => done(new Error(error)))
    })
  })
})
