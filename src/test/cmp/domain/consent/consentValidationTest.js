import {expect} from 'chai'
import GlobalVendorList from '../../../resources/globalvendorlist.json'
import {
  ALL_ALLOWED,
  ALL_DISALLOWED,
  CUSTOM_ALLOWED,
  getConsentVendorsContext
} from '../../../../cmp/domain/consent/consentValidation'

describe('consentValidation', () => {
  describe('Given a consent and a globalVendor list, getConsentVendorsContext', () => {
    it('Should return ALL_ALLOWED if all vendors from the global vendor list are allowed in the consent', done => {
      const givenGlobalVendorIds = GlobalVendorList.vendors.map(
        vendor => vendor.id
      )
      const givenAcceptedVendorIds = givenGlobalVendorIds

      getConsentVendorsContext({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenAcceptedVendorIds
      })
        .then(value => {
          expect(value, 'should be all allowed').to.equal(ALL_ALLOWED)
          done()
        })
        .catch(e => done(e))
    })
    it('Should return ALL_DISALLOWED if none of the vendors from the global vendor list are allowed in the consent', done => {
      const givenGlobalVendorIds = GlobalVendorList.vendors.map(
        vendor => vendor.id
      )
      const givenAcceptedVendorIds = []

      getConsentVendorsContext({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenGlobalVendorIds
      })
        .then(value => {
          expect(value, 'should be all disallowed').to.equal(ALL_DISALLOWED)
          done()
        })
        .catch(e => done(e))
    })
    it('Should return CUSTOM_ALLOWED if some of but not all the vendors from the global vendor list are allowed in the consent', done => {
      const givenGlobalVendorIds = GlobalVendorList.vendors.map(
        vendor => vendor.id
      )
      const givenAcceptedVendorIds = givenGlobalVendorIds.slice(0, 10)

      getConsentVendorsContext({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenGlobalVendorIds
      })
        .then(value => {
          expect(value, 'should be custom allowed').to.equal(CUSTOM_ALLOWED)
          done()
        })
        .catch(e => done(e))
    })
  })
  describe('Given a consent and a globalVendor list and a subset of allowed vendor ids, getConsentVendorsContext', () => {
    it('Should return ALL_ALLOWED if all accepted vendors from the global vendor list are allowed in the consent', done => {
      const givenGlobalVendorIds = GlobalVendorList.vendors.map(
        vendor => vendor.id
      )
      const givenAllowedVendorIds = givenGlobalVendorIds.slice(0, 10)
      const givenAcceptedVendorIds = givenAllowedVendorIds

      getConsentVendorsContext({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenGlobalVendorIds,
        allowedVendorIds: givenAllowedVendorIds
      })
        .then(value => {
          expect(value, 'should be all allowed').to.equal(ALL_ALLOWED)
          done()
        })
        .catch(e => done(e))
    })
    it('Should return ALL_DISALLOWED if none of the accepted vendors from the global vendor list are allowed in the consent', done => {
      const givenGlobalVendorIds = GlobalVendorList.vendors.map(
        vendor => vendor.id
      )
      const givenAllowedVendorIds = givenGlobalVendorIds.slice(0, 10)
      const givenAcceptedVendorIds = []

      getConsentVendorsContext({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenGlobalVendorIds,
        allowedVendorIds: givenAllowedVendorIds
      })
        .then(value => {
          expect(value, 'should be all disallowed').to.equal(ALL_DISALLOWED)
          done()
        })
        .catch(e => done(e))
    })
    it('Should return CUSTOM_ALLOWED if some of but not all the accepted vendors from the global vendor list are allowed in the consent', done => {
      const givenGlobalVendorIds = GlobalVendorList.vendors.map(
        vendor => vendor.id
      )
      const givenAllowedVendorIds = givenGlobalVendorIds.slice(0, 10)
      const givenAcceptedVendorIds = givenAllowedVendorIds.slice(0, 5)

      getConsentVendorsContext({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenGlobalVendorIds,
        allowedVendorIds: givenAllowedVendorIds
      })
        .then(value => {
          expect(value, 'should be custom allowed').to.equal(CUSTOM_ALLOWED)
          done()
        })
        .catch(e => done(e))
    })
  })
})
