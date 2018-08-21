import {expect} from 'chai'
import {ConsentString} from 'consent-string'
import GlobalVendorList from '../../../resources/globalvendorlist.json'
import {
  ALL_ALLOWED,
  ALL_DISALLOWED,
  consentHasAllInStatus,
  CUSTOM_ALLOWED
} from '../../../../cmp/infrastructure/service/consentValidation'

describe('consentValidation', () => {
  describe('Given a consent and a globalVendor list, consentHasAllInStatus', () => {
    it('Should return ALL_ALLOWED if all vendors from the global vendor list are allowed in the consent', done => {
      const givenConsent = new ConsentString()
      const givenGlobalVendorList = GlobalVendorList
      givenConsent.setGlobalVendorList(givenGlobalVendorList)
      givenConsent.setVendorsAllowed(
        givenGlobalVendorList.vendors.map(vendor => vendor.id)
      )

      consentHasAllInStatus({
        consent: givenConsent,
        globalVendorList: givenGlobalVendorList
      })
        .then(value => {
          expect(value, 'should be all allowed').to.equal(ALL_ALLOWED)
          done()
        })
        .catch(e => done(e))
    })
    it('Should return ALL_DISALLOWED if none of the vendors from the global vendor list are allowed in the consent', done => {
      const givenConsent = new ConsentString()
      const givenGlobalVendorList = GlobalVendorList
      givenConsent.setGlobalVendorList(givenGlobalVendorList)

      consentHasAllInStatus({
        consent: givenConsent,
        globalVendorList: givenGlobalVendorList
      })
        .then(value => {
          expect(value, 'should be all disallowed').to.equal(ALL_DISALLOWED)
          done()
        })
        .catch(e => done(e))
    })
    it('Should return CUSTOM_ALLOWED if some of but not all the vendors from the global vendor list are allowed in the consent', done => {
      const givenConsent = new ConsentString()
      const givenGlobalVendorList = GlobalVendorList
      givenConsent.setGlobalVendorList(givenGlobalVendorList)
      givenConsent.setVendorAllowed(givenGlobalVendorList.vendors[0].id, true)

      consentHasAllInStatus({
        consent: givenConsent,
        globalVendorList: givenGlobalVendorList
      })
        .then(value => {
          expect(value, 'should be custom allowed').to.equal(CUSTOM_ALLOWED)
          done()
        })
        .catch(e => done(e))
    })
  })
})
