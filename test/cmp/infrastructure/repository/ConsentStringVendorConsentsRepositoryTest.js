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
})
