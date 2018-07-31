import {expect} from 'chai'
import getCmpVersion from '../../../src/cmp/infrastructure/getCmpVersion'

describe('getCmpVersion test', () => {
  it('Should return the major version from npm_package_version environment variable', done => {
    process.env.npm_package_version = '4.5.6'
    const version = getCmpVersion()
    expect(version).equal('4')
    done()
  })
  it('Should return 1 as a default version when npm_package_version environment variable is not set', done => {
    process.env = {}
    const version = getCmpVersion()
    expect(version).equal('1')
    done()
  })
})
