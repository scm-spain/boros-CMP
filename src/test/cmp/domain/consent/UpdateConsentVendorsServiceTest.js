import {expect} from 'chai'
import sinon from 'sinon'
import GlobalVendorList from '../../../resources/globalvendorlist.json'
import GlobalVendorList73 from '../../../resources/globalvendorlist.73.json'
import UpdateConsentVendorsService from '../../../../cmp/domain/consent/UpdateConsentVendorsService'
import {NewVendorsStatusService} from '../../../../cmp/domain/vendor_consents/NewVendorsStatusService'

describe('UpdateConsentVendorsService', () => {
  describe('Given consented vendors with a version list number that differs to the version list number of the global vendor list, assuming that all new vendors are accepted (ALL_ALLOW option)', () => {
    it('Should save a new consent with the new vendors from the v74 list that are not in the v73', done => {
      const givenNewGlobalVendorList = GlobalVendorList
      const givenOldGlobalVendorList = GlobalVendorList73
      const givenAcceptedVendors = givenOldGlobalVendorList.vendors.map(
        vendor => vendor.id
      )
      const givenAcceptedPurposes = givenOldGlobalVendorList.purposes.map(
        purpose => purpose.id
      )
      const givenNewVendorsAcceptationOption = 'OPTION_ALL_ALLOW'

      const vendorConsentsRepositoryMock = {
        saveVendorConsents: () => Promise.resolve()
      }
      const saveVendorConsentsSpy = sinon.spy(
        vendorConsentsRepositoryMock,
        'saveVendorConsents'
      )

      const vendorListRepositoryMock = {
        getGlobalVendorList: ({vendorListVersion}) =>
          vendorListVersion === givenOldGlobalVendorList.vendorListVersion
            ? Promise.resolve(givenOldGlobalVendorList)
            : Promise.reject(
                new Error('should request only the obsolete version')
              )
      }
      const newVendorsStatusService = new NewVendorsStatusService({
        option: givenNewVendorsAcceptationOption
      })

      const service = new UpdateConsentVendorsService({
        vendorConsentsRepository: vendorConsentsRepositoryMock,
        vendorListRepository: vendorListRepositoryMock,
        newVendorsStatusService
      })

      service
        .updateConsentVendorList({
          consentAcceptedVendors: givenAcceptedVendors,
          consentAcceptedPurposes: givenAcceptedPurposes,
          newGlobalVendorList: givenNewGlobalVendorList,
          oldGlobalVendorList: givenOldGlobalVendorList
        })
        .then(() => {
          expect(
            saveVendorConsentsSpy.calledOnce,
            'should call to save updated vendor consents'
          ).to.be.true
          expect(
            saveVendorConsentsSpy.args[0][0].vendorConsents.vendorConsents,
            'should send the accepted vendor consents containing the new ones'
          ).to.include(395)
          expect(
            saveVendorConsentsSpy.args[0][0].vendorConsents.vendorConsents
              .length,
            'should contain 3 new accepted vendors'
          ).to.equal(givenNewGlobalVendorList.vendors.length)
          expect(
            saveVendorConsentsSpy.args[0][0].vendorConsents.purposeConsents,
            'should contain the same accepted purposes'
          ).to.deep.equal(givenAcceptedPurposes)
          done()
        })
        .catch(e => done(e))
    })
  })
  describe('Given consented vendors with a version list number that differs to the version list number of the global vendor list, and a list of allowed vendor ids, assuming that all new vendors are accepted (ALL_ALLOW option)', () => {
    it('Should save a new consent with the new vendors from the v74 list that are not in the v73', done => {
      const givenNewGlobalVendorList = GlobalVendorList
      const givenOldGlobalVendorList = GlobalVendorList73
      const givenAllowedVendorIds = givenNewGlobalVendorList.vendors
        .map(vendor => vendor.id)
        .filter(id => id !== 395)
      const givenAcceptedVendors = givenOldGlobalVendorList.vendors.map(
        vendor => vendor.id
      )
      const givenAcceptedPurposes = givenOldGlobalVendorList.purposes.map(
        purpose => purpose.id
      )
      const givenNewVendorsAcceptationOption = 'OPTION_ALL_ALLOW'

      const vendorConsentsRepositoryMock = {
        saveVendorConsents: () => Promise.resolve()
      }
      const saveVendorConsentsSpy = sinon.spy(
        vendorConsentsRepositoryMock,
        'saveVendorConsents'
      )

      const vendorListRepositoryMock = {
        getGlobalVendorList: ({vendorListVersion}) =>
          vendorListVersion === givenOldGlobalVendorList.vendorListVersion
            ? Promise.resolve(givenOldGlobalVendorList)
            : Promise.reject(
                new Error('should request only the obsolete version')
              )
      }
      const newVendorsStatusService = new NewVendorsStatusService({
        option: givenNewVendorsAcceptationOption
      })

      const service = new UpdateConsentVendorsService({
        vendorConsentsRepository: vendorConsentsRepositoryMock,
        vendorListRepository: vendorListRepositoryMock,
        newVendorsStatusService
      })

      service
        .updateConsentVendorList({
          consentAcceptedVendors: givenAcceptedVendors,
          consentAcceptedPurposes: givenAcceptedPurposes,
          newGlobalVendorList: givenNewGlobalVendorList,
          oldGlobalVendorList: givenOldGlobalVendorList,
          allowedVendorIds: givenAllowedVendorIds
        })
        .then(() => {
          expect(
            saveVendorConsentsSpy.calledOnce,
            'should call to save updated vendor consents'
          ).to.be.true
          expect(
            saveVendorConsentsSpy.args[0][0].vendorConsents.vendorConsents,
            'should not accept a non-allowed vendor id'
          ).to.not.include(395)
          expect(
            saveVendorConsentsSpy.args[0][0].vendorConsents.vendorConsents
              .length,
            'should contain 2 new accepted vendors (only allowed)'
          ).to.equal(givenAllowedVendorIds.length)
          expect(
            saveVendorConsentsSpy.args[0][0].vendorConsents.purposeConsents,
            'should contain the same accepted purposes'
          ).to.deep.equal(givenAcceptedPurposes)
          done()
        })
        .catch(e => done(e))
    })
  })
})
