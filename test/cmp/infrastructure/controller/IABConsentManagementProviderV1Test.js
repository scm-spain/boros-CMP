import {expect} from 'chai'
import sinon from 'sinon'
import IABConsentManagementProviderV1 from '../../../../src/cmp/infrastructure/controller/IABConsentManagementProviderV1'

describe('IAB Consent Management Provider V1', () => {
  describe('getVendorConsents method', () => {
    it('Should call get vendor consents use case and call the observer with success value', done => {
      const givenVendorIds = [1, 2]
      const expectedResult = 'expected result'
      const getVendorConsentsUseCaseMock = {
        getVendorConsents: () => Promise.resolve(expectedResult)
      }
      const getVendorConsentsSpy = sinon.spy(
        getVendorConsentsUseCaseMock,
        'getVendorConsents'
      )
      const observerSpy = sinon.spy()

      const iabCMP = new IABConsentManagementProviderV1({
        getVendorConsentsUseCase: getVendorConsentsUseCaseMock
      })
      iabCMP
        .getVendorConsents(givenVendorIds, observerSpy)
        .then(() => {
          expect(
            getVendorConsentsSpy.calledOnce,
            'get vendor consents shoud have been called'
          ).to.be.true
          expect(
            getVendorConsentsSpy.args[0][0],
            'get vendor consents should have received only the business parameters'
          ).to.deep.equals({vendorIds: givenVendorIds})
          expect(observerSpy.calledOnce, 'observer should have been called').to
            .be.true
          expect(observerSpy.args[0][0]).to.deep.equals(expectedResult)
          expect(observerSpy.args[0][1]).to.be.true
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
  describe('getConsentData method', () => {
    it('Should call get consent data use case and call the observer with success value', done => {
      const givenConsentStringVersion = 'whatever'
      const expectedResult = 'expected result'
      const getConsentDataUseCaseMock = {
        getConsentData: () => Promise.resolve().then(() => expectedResult)
      }
      const getConsentDataSpy = sinon.spy(
        getConsentDataUseCaseMock,
        'getConsentData'
      )
      const observerSpy = sinon.spy()

      const iabCMP = new IABConsentManagementProviderV1({
        getConsentDataUseCase: getConsentDataUseCaseMock
      })
      iabCMP
        .getConsentData(givenConsentStringVersion, observerSpy)
        .then(() => {
          expect(
            getConsentDataSpy.calledOnce,
            'get consent data shoud have been called'
          ).to.be.true
          expect(
            getConsentDataSpy.args[0][0],
            'get consent data should have received only the business parameters'
          ).to.deep.equals({consentStringVersion: givenConsentStringVersion})
          expect(observerSpy.calledOnce, 'observer should have been called').to
            .be.true
          expect(observerSpy.args[0][0]).to.deep.equals(expectedResult)
          expect(observerSpy.args[0][1]).to.be.true
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
  describe('ping method', () => {
    it('Should call the ping use case and call the observer with success value', done => {
      const expectedResult = 'expected result'
      const pingUseCaseMock = {
        ping: () => Promise.resolve().then(() => expectedResult)
      }
      const pingSpy = sinon.spy(pingUseCaseMock, 'ping')
      const observerSpy = sinon.spy()

      const iabCMP = new IABConsentManagementProviderV1({
        pingUseCase: pingUseCaseMock
      })
      iabCMP
        .ping(null, observerSpy)
        .then(() => {
          expect(pingSpy.calledOnce, 'ping shoud have been called').to.be.true
          expect(observerSpy.calledOnce, 'observer should have been called').to
            .be.true
          expect(observerSpy.args[0][0]).to.deep.equals(expectedResult)
          expect(observerSpy.args[0][1]).to.be.true
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
  describe('getConsentStatus method', () => {
    it('Should return the consent status', done => {
      const expectedResult = 'ACCEPTED'
      const consentStatusUseCaseMock = {
        getConsentStatus: () => Promise.resolve().then(() => expectedResult)
      }
      const iabCMP = new IABConsentManagementProviderV1({
        getConsentStatusUseCase: consentStatusUseCaseMock
      })
      iabCMP
        .getConsentStatus()
        .then(result => {
          expect(result, 'Should be ACCEPTED').equal(expectedResult)
          done()
        })
        .catch(e => done(e))
    })
  })
})
