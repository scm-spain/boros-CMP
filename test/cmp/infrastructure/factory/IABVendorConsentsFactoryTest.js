import {expect} from 'chai'
import {ConsentString} from 'consent-string'
import IABVendorConsentsFactory from '../../../../src/cmp/infrastructure/factory/IABVendorConsentsFactory'

describe('IAB VendorConsents Factory', () => {
  describe('createVendorConsents method', () => {
    it('Should return a VendorConsents with vendor and purpose consent values', done => {
      const givenGdprApplies = true
      const givenStoreConsentGlobally = false
      const givenGlobalVendorList = require('./../../resources/globalvendorlist.json')
      const givenPurposesAllowed = [1, 2]
      const givenVendorsAllowed = [1, 5]

      const givenConsent = new ConsentString()
      givenConsent.setPurposesAllowed(givenPurposesAllowed)
      givenConsent.setVendorsAllowed(givenVendorsAllowed)

      const factory = new IABVendorConsentsFactory({
        gdprApplies: givenGdprApplies,
        storeConsentGlobally: givenStoreConsentGlobally
      })

      factory
        .createVendorConsents({
          globalVendorList: givenGlobalVendorList,
          consent: givenConsent
        })
        .then(vendorConsents => {
          givenGlobalVendorList.vendors.forEach(v => {
            const condition = givenVendorsAllowed.includes(v.id)
            expect(
              vendorConsents.vendorConsents[v.id],
              `The vendor consent ${
                vendorConsents.vendorConsents[v.id]
              } should be ${condition}`
            ).to.equal(condition)
          })
          givenGlobalVendorList.purposes.forEach(p => {
            const condition = givenPurposesAllowed.includes(p.id)
            expect(
              vendorConsents.purposeConsents[p.id],
              `The purpose consent ${
                vendorConsents.purposeConsents[p.id]
              } should be ${condition}`
            ).to.equal(condition)
          })
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
})
