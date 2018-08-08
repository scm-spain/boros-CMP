import {expect} from 'chai'
import sinon from 'sinon'
import SetVendorConsentsUseCase from '../../../src/cmp/application/services/SetVendorConsentsUseCase'

describe('SetVendorConsentsUseCase', () => {
  it('Should save the received VendorConsents', done => {
    const givenVendorConsents = {
      what: 'ever'
    }
    const vendorConsentsRepositoryMock = {
      saveVendorConsents: () => Promise.resolve()
    }
    const saveVendorConsentsSpy = sinon.spy(
      vendorConsentsRepositoryMock,
      'saveVendorConsents'
    )

    const useCase = new SetVendorConsentsUseCase({
      vendorConsentsRepository: vendorConsentsRepositoryMock
    })

    useCase
      .setVendorConsents({vendorConsents: givenVendorConsents})
      .then(() => {
        expect(
          saveVendorConsentsSpy.calledOnce,
          'should call to save the vendor consents'
        ).to.be.true
        expect(
          saveVendorConsentsSpy.args[0][0].vendorConsents,
          'save the vendor consents should receive the VendorConsents object'
        ).to.deep.equal(givenVendorConsents)
      })
      .then(() => done())
      .catch(e => done(e))
  })
})
