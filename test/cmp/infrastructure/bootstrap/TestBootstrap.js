import TestContainer from '../container/TestContainer'
import Cmp from '../../../../src/cmp/application/Cmp'

export default class TestBootstrap {
  static init({window, config}) {
    return Promise.resolve().then(() =>
      new Cmp({
        container: new TestContainer({
          config,
          window
        })
      }).commandConsumer()
    )
  }
}
