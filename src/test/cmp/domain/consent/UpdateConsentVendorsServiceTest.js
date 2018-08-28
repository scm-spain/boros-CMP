import {expect} from 'chai'
import sinon from 'sinon'
import GlobalVendorList from '../../../resources/globalvendorlist.json'
import GlobalVendorList73 from '../../../resources/globalvendorlist.73.json'
import UpdateConsentVendorsService from '../../../../cmp/domain/consent/UpdateConsentVendorsService'
import {NewVendorsStatusFactory} from '../../../../cmp/domain/vendor_consents/NewVendorsStatusFactory'

describe('UpdateConsentVendorsService', () => {
  describe('Given consented vendors with a version list number that is equal to the version list number of the global vendor list', () => {
    it('Should not change the stored consent', done => {
      const givenGlobalVendorList = GlobalVendorList
      const givenAcceptedVendors = givenGlobalVendorList.vendors
        .map(vendor => vendor.id)
        .slice(0, 5)
      const givenAcceptedPurposes = givenGlobalVendorList.purposes.map(
        purpose => purpose.id
      )
      const givenConsentGlobalVendorListVersion =
        givenGlobalVendorList.vendorListVersion

      const vendorConsentsRepositoryMock = {
        saveVendorConsents: () => Promise.resolve()
      }
      const saveVendorConsentsSpy = sinon.spy(
        vendorConsentsRepositoryMock,
        'saveVendorConsents'
      )

      const vendorListRepositoryMock = {
        getGlobalVendorList: () => Promise.resolve()
      }
      const newVendorsStatusFactory = new NewVendorsStatusFactory()

      const service = new UpdateConsentVendorsService({
        vendorConsentsRepository: vendorConsentsRepositoryMock,
        vendorListRepository: vendorListRepositoryMock,
        newVendorsStatusFactory: newVendorsStatusFactory
      })

      service
        .updateConsentVendorList({
          consentAcceptedVendors: givenAcceptedVendors,
          consentAcceptedPurposes: givenAcceptedPurposes,
          consentGlobalVendorListVersion: givenConsentGlobalVendorListVersion,
          currentGlobalVendorList: givenGlobalVendorList
        })
        .then(() => {
          expect(
            saveVendorConsentsSpy.called,
            'should not call to save any consent when version list number does not change'
          ).to.be.false
          done()
        })
        .catch(e => done(e))
    })
  })
  describe('Given consented vendors with a version list number that differs to the version list number of the global vendor list, assuming that all new vendors are accepted (ALL_ALLOW option)', () => {
    it('Should save a new consent with the new vendors from the v74 list that are not in the v73', done => {
      const givenCurrentGlobalVendorList = GlobalVendorList
      const givenObsoleteGlobalVendorList = GlobalVendorList73
      const givenAcceptedVendors = givenObsoleteGlobalVendorList.vendors.map(
        vendor => vendor.id
      )
      const givenAcceptedPurposes = givenObsoleteGlobalVendorList.purposes.map(
        purpose => purpose.id
      )
      const givenConsentGlobalVendorListVersion =
        givenObsoleteGlobalVendorList.vendorListVersion
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
          vendorListVersion === givenObsoleteGlobalVendorList.vendorListVersion
            ? Promise.resolve(givenObsoleteGlobalVendorList)
            : Promise.reject(
                new Error('should request only the obsolete version')
              )
      }
      const newVendorsStatusFactory = new NewVendorsStatusFactory({
        option: givenNewVendorsAcceptationOption
      })

      const service = new UpdateConsentVendorsService({
        vendorConsentsRepository: vendorConsentsRepositoryMock,
        vendorListRepository: vendorListRepositoryMock,
        newVendorsStatusFactory: newVendorsStatusFactory
      })

      service
        .updateConsentVendorList({
          consentAcceptedVendors: givenAcceptedVendors,
          consentAcceptedPurposes: givenAcceptedPurposes,
          consentGlobalVendorListVersion: givenConsentGlobalVendorListVersion,
          currentGlobalVendorList: givenCurrentGlobalVendorList
        })
        .then(() => {
          expect(
            saveVendorConsentsSpy.calledOnce,
            'should call to save updated vendor consents'
          ).to.be.true
          expect(
            saveVendorConsentsSpy.args[0][0].vendorConsents,
            'should send the accepted vendor consents containing the new ones'
          ).to.include(395)
          expect(
            saveVendorConsentsSpy.args[0][0].vendorConsents.length,
            'should contain 3 new accepted vendors'
          ).to.equal(givenCurrentGlobalVendorList.vendors.length)
          expect(
            saveVendorConsentsSpy.args[0][0].purposeConsents,
            'should contain the same accepted purposes'
          ).to.deep.equal(givenAcceptedPurposes)
          done()
        })
        .catch(e => done(e))
    })
  })
  describe('Given consented vendors with a version list number that differs to the version list number of the global vendor list, and a list of allowed vendor ids, assuming that all new vendors are accepted (ALL_ALLOW option)', () => {
    it('Should save a new consent with the new vendors from the v74 list that are not in the v73', done => {
      const givenCurrentGlobalVendorList = GlobalVendorList
      const givenAllowedVendorIds = givenCurrentGlobalVendorList.vendors
        .map(vendor => vendor.id)
        .filter(id => id !== 395)
      const givenObsoleteGlobalVendorList = GlobalVendorList73
      const givenAcceptedVendors = givenObsoleteGlobalVendorList.vendors.map(
        vendor => vendor.id
      )
      const givenAcceptedPurposes = givenObsoleteGlobalVendorList.purposes.map(
        purpose => purpose.id
      )
      const givenConsentGlobalVendorListVersion =
        givenObsoleteGlobalVendorList.vendorListVersion
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
          vendorListVersion === givenObsoleteGlobalVendorList.vendorListVersion
            ? Promise.resolve(givenObsoleteGlobalVendorList)
            : Promise.reject(
                new Error('should request only the obsolete version')
              )
      }
      const newVendorsStatusFactory = new NewVendorsStatusFactory({
        option: givenNewVendorsAcceptationOption
      })

      const service = new UpdateConsentVendorsService({
        vendorConsentsRepository: vendorConsentsRepositoryMock,
        vendorListRepository: vendorListRepositoryMock,
        newVendorsStatusFactory: newVendorsStatusFactory
      })

      service
        .updateConsentVendorList({
          consentAcceptedVendors: givenAcceptedVendors,
          consentAcceptedPurposes: givenAcceptedPurposes,
          consentGlobalVendorListVersion: givenConsentGlobalVendorListVersion,
          currentGlobalVendorList: givenCurrentGlobalVendorList,
          allowedVendorIds: givenAllowedVendorIds
        })
        .then(() => {
          expect(
            saveVendorConsentsSpy.calledOnce,
            'should call to save updated vendor consents'
          ).to.be.true
          expect(
            saveVendorConsentsSpy.args[0][0].vendorConsents,
            'should not accept a non-allowed vendor id'
          ).to.not.include(395)
          expect(
            saveVendorConsentsSpy.args[0][0].vendorConsents.length,
            'should contain 2 new accepted vendors (only allowed)'
          ).to.equal(givenAllowedVendorIds.length)
          expect(
            saveVendorConsentsSpy.args[0][0].purposeConsents,
            'should contain the same accepted purposes'
          ).to.deep.equal(givenAcceptedPurposes)
          done()
        })
        .catch(e => done(e))
    })
  })
})
