import {expect} from 'chai'
import PingUseCase from '../../../src/cmp/application/PingUseCase'

describe('Ping Use Case', () => {
  it('Should return directly with the IAB PingReturn specification', done => {
    const useCase = new PingUseCase()

    const expectedPingReturn = {
      gdprAppliesGlobally: false,
      cmpLoaded: true
    }

    useCase
      .ping()
      .then(pingReturn => {
        expect(pingReturn, 'invalid PingReturn response').to.deep.equal(
          expectedPingReturn
        )
      })
      .then(() => done())
      .catch(e => done(e))
  })
})
