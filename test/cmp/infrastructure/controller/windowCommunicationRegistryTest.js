import {expect} from 'chai'
import registerWindowCMP from '../../../../src/cmp/infrastructure/controller/windowCommunicationRegistry'

describe('registerWindowCMP', () => {
  describe('Given a cmp instance and a window object', () => {
    it('Should register the cmp instance into window.__cmp property', done => {
      const windowMock = {}
      const cmpMock = () => null

      Promise.resolve()
        .then(() =>
          registerWindowCMP({
            window: windowMock,
            cmp: cmpMock
          })
        )
        .then(() => {
          expect(windowMock.__cmp, 'should have registered the cmp function').to
            .not.undefined
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
})
