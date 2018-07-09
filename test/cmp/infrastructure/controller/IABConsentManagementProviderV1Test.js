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

  describe('getConsentStatus method', () => {
    it('Should return the consent status', done => {
      const expectedResult = 'ACCEPTED'
      const consentStatusUseCaseMock = {
        getConsentStatus: () => Promise.resolve().then(() => expectedResult)
      }
      const iabCMP = new IABConsentManagementProviderV1({
        getConsentStatusUseCase: consentStatusUseCaseMock
      })
      const observerSpy = sinon.spy()
      iabCMP
        .getConsentStatus(null, observerSpy)
        .then(result => {
          expect(observerSpy.calledOnce, 'observer should have been called').to
            .be.true
          expect(observerSpy.args[0][0]).to.deep.equals(expectedResult)
          expect(observerSpy.args[0][1]).to.be.true
          done()
        })
        .catch(e => done(e))
    })
  })
  describe('getVendorList method', () => {
    it('Should call get vendor list use case and call the observer with success value', done => {
      const givenVendorListVersion = 999
      const expectedResult = 'expected result'
      const getVendorListUseCaseMock = {
        getVendorList: () => Promise.resolve(expectedResult)
      }
      const getVendorListSpy = sinon.spy(
        getVendorListUseCaseMock,
        'getVendorList'
      )
      const observerSpy = sinon.spy()

      const iabCMP = new IABConsentManagementProviderV1({
        getVendorListUseCase: getVendorListUseCaseMock
      })
      iabCMP
        .getVendorList(givenVendorListVersion, observerSpy)
        .then(() => {
          expect(
            getVendorListSpy.calledOnce,
            'get vendor list shoud have been called'
          ).to.be.true
          expect(
            getVendorListSpy.args[0][0],
            'get vendor list should have received only the business parameters'
          ).to.deep.equals({vendorListVersion: givenVendorListVersion})
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
  describe('setVendorConsents method', () => {
    it('Should call set vendor consents use case and call the observer with success value', done => {
      const givenVendorConsents = {
        vendorConsents: [1, 2],
        purposeConsents: [1, 2, 3, 4, 5]
      }
      const setVendorConsentsUseCaseMock = {
        setVendorConsents: () => Promise.resolve()
      }
      const setVendorConsentsSpy = sinon.spy(
        setVendorConsentsUseCaseMock,
        'setVendorConsents'
      )
      const observerSpy = sinon.spy()

      const iabCMP = new IABConsentManagementProviderV1({
        setVendorConsentsUseCase: setVendorConsentsUseCaseMock
      })
      iabCMP
        .setVendorConsents(givenVendorConsents, observerSpy)
        .then(() => {
          expect(
            setVendorConsentsSpy.calledOnce,
            'set vendor consents shoud have been called'
          ).to.be.true
          expect(
            setVendorConsentsSpy.args[0][0],
            'set vendor consents should have received only the business parameters'
          ).to.deep.equals({vendorConsents: givenVendorConsents})
          expect(observerSpy.calledOnce, 'observer should have been called').to
            .be.true
          expect(observerSpy.args[0][1]).to.be.true
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
})
