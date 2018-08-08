import {expect} from 'chai'
import {JSDOM} from 'jsdom'
import IframeRegistry from '../../../../src/cmp/infrastructure/service/IframeRegistry'

describe('IFrameRegistry', () => {
  describe('Given a window document', () => {
    it('Should create an IFrame and write it on the document', done => {
      const givenDOM = new JSDOM(
        '<!DOCTYPE html><div id="fear">I\'m BATMAN!</div>'
      ).window.document

      new IframeRegistry({dom: givenDOM})
        .register({hostLocation: 'www.google.es'})
        .then(iFrame => {
          expect(iFrame.id).to.equal('cmp-frame')
          expect(givenDOM.getElementById('cmp-frame').src).to.equal(iFrame.src)
          done()
        })
        .catch(error => done(new Error(error)))
    })
  })
})
