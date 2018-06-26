import {expect} from 'chai'
import sinon from 'sinon'
import {ConsentString} from 'consent-string'
import GetVendorConsentsUseCase from '../../../src/cmp/application/GetVendorConsentsUseCase'
import VendorConsents from '../../../src/cmp/domain/VendorConsents'

describe('Get Vendor Consents Use Case', () => {
  it('Should create the VendorConsents using the stored consent and the global vendor list', done => {
    const aConsentString =
      'BOPVloMOPi60FABABAENBA-AAAAcF7_______9______9uz_Gv_r_f__33e8_39v_h_7_-___m_-3zV4-_lvR11yPA1OrfIrwFhiAwAA'
    const aGlobalVendorList = require('./../resources/globalvendorlist.json')
    const aConsentObject = new ConsentString(aConsentString)
    const aAllowedVendorIds = [1]
    const aVendorConsentsObject = new VendorConsents({
      metadata: 'JUST FOR TEST'
    })
    const consentRepositoryMock = {
      getConsentData: () => Promise.resolve(aConsentString)
    }
    const vendorRepositoryMock = {
      getGlobalVendorList: () => Promise.resolve(aGlobalVendorList)
    }
    const consentFactoryMock = {
      createConsent: () => Promise.resolve(aConsentObject)
    }
    const vendorConsentsFactoryMock = {
      createVendorConsents: () => Promise.resolve(aVendorConsentsObject)
    }

    const useCase = new GetVendorConsentsUseCase({
      consentRepository: consentRepositoryMock,
      vendorRepository: vendorRepositoryMock,
      consentFactory: consentFactoryMock,
      vendorConsentsFactory: vendorConsentsFactoryMock
    })

    const getConsentDataSpy = sinon.spy(consentRepositoryMock, 'getConsentData')
    const getGlobalVendorListSpy = sinon.spy(
      vendorRepositoryMock,
      'getGlobalVendorList'
    )
    const createConsentSpy = sinon.spy(consentFactoryMock, 'createConsent')
    const createVendorConsentsSpy = sinon.spy(
      vendorConsentsFactoryMock,
      'createVendorConsents'
    )

    useCase
      .getVendorConsents({vendorIds: aAllowedVendorIds})
      .then(vendorConsents => {
        expect(
          getConsentDataSpy.calledOnce,
          'should have tried to get the stored consent data'
        ).to.be.true
        expect(
          getGlobalVendorListSpy.calledOnce,
          'should have tried to get the global vendor list'
        ).to.be.true
        expect(
          createConsentSpy.calledOnce,
          'should create the consent object using the factory'
        ).to.be.true
        expect(
          createVendorConsentsSpy.calledOnce,
          'should create the vendor consents object using the factory'
        ).to.be.true

        expect(
          [
            createConsentSpy.args[0][0].consentString,
            createConsentSpy.args[0][0].globalVendorList
          ],
          'should create the consent object using the consent string and the global vendor list'
        ).to.deep.equal([aConsentString, aGlobalVendorList])

        expect(
          [
            createVendorConsentsSpy.args[0][0].consent,
            createVendorConsentsSpy.args[0][0].globalVendorList,
            createVendorConsentsSpy.args[0][0].allowedVendorIds
          ],
          'should create the vendor consents using the stored consent, the global vendor list and the allowed vendor ids array'
        ).to.deep.equal([aConsentObject, aGlobalVendorList, aAllowedVendorIds])

        expect(
          vendorConsents,
          'should return the object returned by the factory'
        ).to.deep.equal(aVendorConsentsObject)
      })
      .then(() => done())
      .catch(e => done(e))
  })
  it('Should throw an UnexistingConsentDataError if there is no consent', done => {
    const consentRepositoryMock = {
      getConsentData: () => Promise.resolve(undefined)
    }
    const vendorRepositoryMock = {
      getGlobalVendorList: () => Promise.resolve()
    }
    const consentFactoryMock = {
      createConsent: () => Promise.resolve()
    }
    const vendorConsentsFactoryMock = {
      createVendorConsents: () => Promise.resolve()
    }

    const useCase = new GetVendorConsentsUseCase({
      consentRepository: consentRepositoryMock,
      vendorRepository: vendorRepositoryMock,
      consentFactory: consentFactoryMock,
      vendorConsentsFactory: vendorConsentsFactoryMock
    })

    useCase
      .getVendorConsents({})
      .then(() =>
        done(new Error('Should have throw an UnexistingConsentDataError'))
      )
      .catch(e => {
        expect(
          e.name,
          'Should have throw an UnexistingConsentDataError'
        ).to.equal('UnexistingConsentDataError')
        done()
      })
      .catch(e => done(e))
  })
})
