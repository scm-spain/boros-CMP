import {expect} from 'chai'
import {JSDOM} from 'jsdom'
import registerCmpLocator from '../../../../cmp/infrastructure/controller/registerCmpLocator'

describe('registerCmpLocator test', () => {
  describe('Given a valid window object', () => {
    it('Should add the iframe inside the window if it does not exist yet', done => {
      const givenWindow = new JSDOM('<!DOCTYPE html><div>Hello world</div>')
        .window
      const expectedIframeName = '__cmpLocator'

      registerCmpLocator({dom: givenWindow.document})
        .then(iframe => {
          expect(
            iframe.name,
            'The returned iframe should be named as __cmpLocator.'
          ).equals(expectedIframeName)
          expect(
            givenWindow.document.getElementsByName(expectedIframeName).length,
            'The __cmpLocator iframe should be created as element in the window.'
          ).equals(1)
          done()
        })
        .catch(error => done(error))
    })
    it('Should return the iframe inside the window if it already exists', done => {
      const givenWindow = new JSDOM('<!DOCTYPE html><div>Hello world</div>')
        .window
      const expectedIframeName = '__cmpLocator'
      const giveniFrame = givenWindow.document.createElement('iframe')
      giveniFrame.style.display = 'none'
      giveniFrame.name = expectedIframeName
      givenWindow.document.body.appendChild(giveniFrame)

      registerCmpLocator({dom: givenWindow.document})
        .then(iframe => {
          expect(
            iframe.name,
            'The returned iframe should be named as __cmpLocator.'
          ).equals(expectedIframeName)
          expect(
            givenWindow.document.getElementsByName(expectedIframeName).length,
            'The __cmpLocator iframe should be created as element in the window.'
          ).equals(1)
          done()
        })
        .catch(error => done(error))
    })
  })
})
