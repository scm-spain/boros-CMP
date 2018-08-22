import {expect} from 'chai'
import {JSDOM} from 'jsdom'
import registerCmpLocator from '../../../../cmp/infrastructure/controller/registerCmpLocator'

describe('registerCmpLocator test', () => {
  describe('Given a valid window object', () => {
    it('Should add the iframe inside the window in it does not exist yet', done => {
      const givenWindow = new JSDOM('<!DOCTYPE html><div>Hello world</div>')
        .window
      const expectedIframeName = '__cmpLocator'

      registerCmpLocator({window: givenWindow})
        .then(() => {
          expect(
            givenWindow.document.getElementsByName(expectedIframeName).length,
            'The __cmpLocator iframe should be created.'
          ).equals(1)
          done()
        })
        .catch(error => done(error))
    })
  })
})
