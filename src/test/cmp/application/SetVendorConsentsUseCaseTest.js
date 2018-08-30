import {expect} from 'chai'
import sinon from 'sinon'
import SetVendorConsentsUseCase from '../../../cmp/application/services/SetVendorConsentsUseCase'

describe('SetVendorConsentsUseCase', () => {
  it('Should save the received VendorConsents', done => {
    const givenVendorConsents = {
      vendorConsents: {
        1: true,
        2: false,
        3: true
      },
      purposeConsents: {
        1: true,
        2: false
      }
    }

    const expectedVendorsToSave = [1, 3]
    const expectedPurposesToSave = [1]

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
          'should receive the vendor consents array to save'
        ).to.deep.equal(expectedVendorsToSave)
        expect(
          saveVendorConsentsSpy.args[0][0].purposeConsents,
          'should receive the vendor purposes array to save'
        ).to.deep.equal(expectedPurposesToSave)
      })
      .then(() => done())
      .catch(e => done(e))
  })
})
