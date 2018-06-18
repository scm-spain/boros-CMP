/* eslint-disable prettier/prettier */
import {expect} from 'chai'
import sinon from 'sinon'
import IABConsentManagementProviderV1 from "../../../../src/cmp/infrastructure/controller/IABConsentManagementProviderV1";

describe('IAB Consent Management Provider V1', () => {
    describe('getConsentData method', () => {
        it('Should call get consent data use case and call the observer with success value', (done) => {
            const givenConsentStringVersion = 'whatever'
            const expectedResult = 'expected result'
            const getConsentDataUseCaseMock = {
                getConsentData: () => Promise.resolve().then(() => expectedResult)
            }
            const getConsentDataSpy = sinon.spy(getConsentDataUseCaseMock, 'getConsentData')
            const observerSpy = sinon.spy()


            const iabCMP = new IABConsentManagementProviderV1({getConsentDataUseCase: getConsentDataUseCaseMock})
            iabCMP.getConsentData(givenConsentStringVersion, observerSpy)
                .then(() => {
                    expect(getConsentDataSpy.calledOnce, 'get consent data shoud have been called').to.be.true
                    expect(getConsentDataSpy.args[0][0], 'get consent data should have received only the business parameters').to.deep.equals({consentStringVersion: givenConsentStringVersion})
                    expect(observerSpy.calledOnce, 'observer should have been called').to.be.true
                    expect(observerSpy.args[0][0]).to.deep.equals(expectedResult)
                    expect(observerSpy.args[0][1]).to.be.true
                })
                .then(() => done())
                .catch(e => done(e))
        })
    })
    describe('ping method', () => {
        it('Should call the ping use case and call the observer with success value', (done) => {
            const expectedResult = 'expected result'
            const pingUseCaseMock = {
                ping: () => Promise.resolve().then(() => expectedResult)
            }
            const pingSpy = sinon.spy(pingUseCaseMock, 'ping')
            const observerSpy = sinon.spy()


            const iabCMP = new IABConsentManagementProviderV1({pingUseCase: pingUseCaseMock})
            iabCMP.ping(null, observerSpy)
                .then(() => {
                    expect(pingSpy.calledOnce, 'ping shoud have been called').to.be.true
                    expect(observerSpy.calledOnce, 'observer should have been called').to.be.true
                    expect(observerSpy.args[0][0]).to.deep.equals(expectedResult)
                    expect(observerSpy.args[0][1]).to.be.true
                })
                .then(() => done())
                .catch(e => done(e))
        })
    })
})
