/* eslint-disable prettier/prettier */
import {expect} from 'chai'
import sinon from 'sinon'
import IABConsentManagementProviderV1 from "../../../../src/cmp/infrastructure/controller/IABConsentManagementProviderV1";

describe('IAB Consent Management Provider V1', () => {
    describe('getConsentData method', () => {
        it('Should call the CMP provider to get the consent data and call the observer with success value', (done) => {
            const givenConsentStringVersion = 'whatever'
            const expectedResult = 'expected result'
            const consentManagementProviderMock = {
                getConsentData: () => Promise.resolve().then(() => expectedResult)
            }
            const getConsentDataSpy = sinon.spy(consentManagementProviderMock, 'getConsentData')
            const observerSpy = sinon.spy()


            const iabCMP = new IABConsentManagementProviderV1({consentManagementProvider: consentManagementProviderMock})
            iabCMP.getConsentData(givenConsentStringVersion, observerSpy)
                .then(() => {
                    expect(getConsentDataSpy.calledOnce, 'CMP shoud have been called').to.be.true
                    expect(getConsentDataSpy.args[0][0], 'CMP should have received only the business parameters').to.deep.equals({consentStringVersion: givenConsentStringVersion})
                    expect(observerSpy.calledOnce, 'Observer should have been called').to.be.true
                    expect(observerSpy.args[0][0]).to.deep.equals(expectedResult)
                    expect(observerSpy.args[0][1]).to.be.true
                })
                .then(() => done())
                .catch(e => done(e))
        })
    })
})
