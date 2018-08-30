import {expect} from 'chai'
import {isWhitelisted} from '../../../../cmp/domain/vendor_consents/whitelistFilter'

describe('whitelistFilter', () => {
  describe('isWhitelisted, given an empty whitelist', () => {
    it('Should return true', () => {
      const givenId = 2
      const givenWhitelist = undefined
      expect(
        isWhitelisted({
          whitelist: givenWhitelist,
          id: givenId
        }),
        'id should be whitelisted'
      ).to.be.true
    })
  })
  describe('isWhitelisted, given a whitelist', () => {
    it('Should return true if the id is into the whitelist', () => {
      const givenId = 2
      const givenWhitelist = [1, 2, 3]

      expect(
        isWhitelisted({
          whitelist: givenWhitelist,
          id: givenId
        }),
        'id should be whitelisted'
      ).to.be.true
    })
    it('Should return false if the id is not into the whitelist', () => {
      const givenId = 4
      const givenWhitelist = [1, 2, 3]

      expect(
        isWhitelisted({
          whitelist: givenWhitelist,
          id: givenId
        }),
        'id should not be whitelisted'
      ).to.be.false
    })
  })
})
