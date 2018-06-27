import {expect} from 'chai'
import sinon from 'sinon'
import CookieVendorConsentsRepository from '../../../../src/cmp/infrastructure/repository/CookieVendorConsentsRepository'

describe('CookieVendorConsentsRepository', () => {
  describe('getVendorConsents', () => {
    it('Should return undefined if there is no stored value into euconsent cookie', done => {
      const givenCookieValue =
        'somecookie=BOPVloMOPVqFzABABAENA8AB-AAAE8A;anothercookie=BOPVloMOPVqFzABABAENA8AB-AAAE8A'
      const documentMock = {
        cookie: givenCookieValue
      }
      const vendorListRepositoryMock = {
        getGlobalVendorList: sinon.spy()
      }
      const vendorConsentsFactoryMock = {}

      const repository = new CookieVendorConsentsRepository({
        dom: documentMock,
        vendorListRepository: vendorListRepositoryMock,
        vendorConsentsFactory: vendorConsentsFactoryMock
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
      const givenEuConsent =
        'BOPVloMOPi60FABABAENBA-AAAAcF7_______9______9uz_Gv_r_f__33e8_39v_h_7_-___m_-3zV4-_lvR11yPA1OrfIrwFhiAwAA'
      const givenCookieValue =
        'pubconsent=BOPVloMOPVqFzABABAENA8AB-AAAE8A; euconsent=' +
        givenEuConsent
      const documentMock = {
        cookie: givenCookieValue
      }
      const vendorListRepositoryMock = {
        getGlobalVendorList: () => givenGlobalVendorList
      }
      const vendorConsentsMock = {
        this: 'is',
        just: 'a',
        test: 'object'
      }
      const vendorConsentsFactoryMock = {
        createFromEncodedConsent: () => vendorConsentsMock
      }
      const createFromEncodedConsentSpy = sinon.spy(
        vendorConsentsFactoryMock,
        'createFromEncodedConsent'
      )

      const repository = new CookieVendorConsentsRepository({
        dom: documentMock,
        vendorListRepository: vendorListRepositoryMock,
        vendorConsentsFactory: vendorConsentsFactoryMock
      })

      repository
        .getVendorConsents({allowedVendorIds: givenAllowedVendorIds})
        .then(vendorConsents => {
          expect(
            vendorConsents,
            'should return a VendorConsents object created with the factory'
          ).to.deep.equal(vendorConsentsMock)
          expect(
            createFromEncodedConsentSpy.args[0][0].encodedConsent,
            'the encoded consent to restore the VendorConsents should be the cookie value'
          ).to.equal(givenEuConsent)
          expect(
            createFromEncodedConsentSpy.args[0][0].globalVendorList,
            'the vendor list to restore the VendorConsents should be the retrieved by the vendor list repository'
          ).to.deep.equal(givenGlobalVendorList)
          expect(
            createFromEncodedConsentSpy.args[0][0].allowedVendorIds,
            'the allowed vendor ids to restore the VendorConsents should be the received as parameter'
          ).to.deep.equal(givenAllowedVendorIds)
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
})
