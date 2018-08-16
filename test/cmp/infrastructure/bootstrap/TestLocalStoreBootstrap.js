import Cmp from '../../../../src/cmp/application/Cmp'
import registerWindowCMP from '../../../../src/cmp/infrastructure/controller/windowCommunicationRegistry'
import TestLocalStoreContainer from '../container/TestLocalStoreContainer'

export default class TestLocalStoreBootstrap {
  static init({window, config}) {
    return Promise.resolve()
      .then(() =>
        new Cmp({
          container: new TestLocalStoreContainer({
            config,
            window
          })
        }).commandConsumer()
      )
      .then(cmp => registerWindowCMP({cmp, window}))
  }
}
