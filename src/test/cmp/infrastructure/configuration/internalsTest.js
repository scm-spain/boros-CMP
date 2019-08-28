import {expect} from 'chai'
import projectConfiguration from '../../../../../package.json'
import {
  CMP_ID,
  CMP_VERSION
} from '../../../../cmp/infrastructure/configuration/internals'

describe('internals', () => {
  describe('CMP_ID', () => {
    it('Should be the assigned number by the IAB to the boros-cmp', () => {
      const expectedId = 129
      expect(CMP_ID, 'incorrect value').to.equal(expectedId)
    })
  })
  describe('CMP_VERSION', () => {
    it('Should be the major project version', () => {
      const expectedVersion = parseInt(
        projectConfiguration.version.split('.')[0]
      )
      expect(CMP_VERSION, 'incorrect value').to.equal(expectedVersion)
    })
  })
})
