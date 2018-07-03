import {expect} from 'chai'
import sinon from 'sinon'
import ConsentStringVendorConsentsRepository from '../../../../src/cmp/infrastructure/repository/ConsentStringVendorConsentsRepository'

describe('ConsentStringVendorConsentsRepository', () => {
  describe('getVendorConsents', () => {
    it('Should return undefined if there is no stored consent', done => {
      const vendorListRepositoryMock = {
        getGlobalVendorList: sinon.spy()
      }
      const vendorConsentsFactoryMock = {}
      const consentRepositoryMock = {
        getConsent: () => Promise.resolve(undefined)
      }

      const repository = new ConsentStringVendorConsentsRepository({
        vendorConsentsFactory: vendorConsentsFactoryMock,
        consentRepository: consentRepositoryMock,
        vendorListRepository: vendorListRepositoryMock
      })

      repository
        .getVendorConsents()
        .then(vendorConsents => {
          expect(
            vendorConsents,
            'there should be no vendor consents defined if there is no cookie'
          ).to.be.undefined
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should return the VendorConsents restored with the cookie, the vendor list and the allowed vendor ids', done => {
      const givenAllowedVendorIds = [1]
      const givenGlobalVendorList = {vendorListVersion: 1}
      const vendorListRepositoryMock = {
        getGlobalVendorList: () => givenGlobalVendorList
      }
      const givenConsent = {
        a: 'test'
      }
      const vendorConsentsMock = {
        this: 'is',
        just: 'a',
        test: 'object'
      }
      const vendorConsentsFactoryMock = {
        createFromConsent: () => vendorConsentsMock
      }
      const createFromConsentSpy = sinon.spy(
        vendorConsentsFactoryMock,
        'createFromConsent'
      )
      const consentRepositoryMock = {
        getConsent: () => Promise.resolve(givenConsent)
      }

      const repository = new ConsentStringVendorConsentsRepository({
        vendorConsentsFactory: vendorConsentsFactoryMock,
        consentRepository: consentRepositoryMock,
        vendorListRepository: vendorListRepositoryMock
      })

      repository
        .getVendorConsents({allowedVendorIds: givenAllowedVendorIds})
        .then(vendorConsents => {
          expect(
            vendorConsents,
            'should return a VendorConsents object created with the factory'
          ).to.deep.equal(vendorConsentsMock)
          expect(
            createFromConsentSpy.args[0][0].consent,
            'the consent to restore the VendorConsents should be the consent restored from the consent repository'
          ).to.deep.equal(givenConsent)
          expect(
            createFromConsentSpy.args[0][0].globalVendorList,
            'the vendor list to restore the VendorConsents should be the retrieved by the vendor list repository'
          ).to.deep.equal(givenGlobalVendorList)
          expect(
            createFromConsentSpy.args[0][0].allowedVendorIds,
            'the allowed vendor ids to restore the VendorConsents should be the received as parameter'
          ).to.deep.equal(givenAllowedVendorIds)
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })

  describe('saveVendorConsents', () => {
    it('Should transform the vendor consents input to an encoded string to save it into the cookie', done => {
      const givenCmpId = 1
      const givenCmpVersion = 1
      const givenConsentLanguage = 'es'
      const givenConsentScreen = 0
      const givenGlobalVendorList = require('./../../resources/globalvendorlist.json')
      const givenDisallowedVendors = [
        9,
        14,
        47,
        57,
        58,
        137,
        141,
        231,
        272,
        293,
        298,
        318,
        336,
        340,
        346,
        365,
        381,
        388,
        395,
        397,
        410,
        412,
        423,
        425,
        430,
        431,
        444,
        447,
        454,
        455
      ]
      const givenAllowedVendors = givenGlobalVendorList.vendors
        .map(v => v.id)
        .filter(id => !givenDisallowedVendors.includes(id))
      const givenAllowedPurposes = [1, 2, 3, 4, 5]

      const givenVendorConsents = {
        vendorConsents: givenAllowedVendors,
        purposeConsents: givenAllowedPurposes
      }

      const vendorConsentsFactoryMock = {}
      const consentRepositoryMock = {
        saveConsent: () => Promise.resolve()
      }
      const vendorListRepositoryMock = {
        getGlobalVendorList: () => Promise.resolve(givenGlobalVendorList)
      }

      const saveConsentSpy = sinon.spy(consentRepositoryMock, 'saveConsent')

      const repository = new ConsentStringVendorConsentsRepository({
        vendorConsentsFactory: vendorConsentsFactoryMock,
        consentRepository: consentRepositoryMock,
        vendorListRepository: vendorListRepositoryMock,
        cmpId: givenCmpId,
        cmpVersion: givenCmpVersion,
        consentLanguage: givenConsentLanguage,
        consentScreen: givenConsentScreen
      })

      const expectedConsentStringShoudEndWith =
        'BABAESBK-AAAAcd7vf____79n_____9uz_Gv_rvf__33e8_39v_h_r_-___mf-3zV4-91vV11yPg1urXIr1FpjQ6MGgA'

      repository
        .saveVendorConsents({vendorConsents: givenVendorConsents})
        .then(() => {
          expect(
            saveConsentSpy.calledOnce,
            'should have called to save the consent string into the cookie'
          ).to.be.true
          expect(
            saveConsentSpy.args[0][0].consent,
            'should have received the string consent as parameter'
          ).to.not.undefined
          expect(
            saveConsentSpy.args[0][0].consent.endsWith(
              expectedConsentStringShoudEndWith
            ),
            'should receive a consent having the correct encoded metadata, purposes and vendors (aware of the update date)'
          ).to.not.undefined
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
})
