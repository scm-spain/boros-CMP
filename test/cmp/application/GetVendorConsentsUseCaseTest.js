import {expect} from 'chai'
import GetVendorConsentsUseCase from '../../../src/cmp/application/services/GetVendorConsentsUseCase'

describe('Get Vendor Consents Use Case', () => {
  it('Should recover the stored VendorConsents if it was stored', done => {
    const givenVendorIds = [1]

    const vendorConsentsMock = {
      this_is_a: 'test_object'
    }
    const vendorConsentsRepositoryMock = {
      getVendorConsents: () => vendorConsentsMock
    }

    const useCase = new GetVendorConsentsUseCase({
      vendorConsentsRepository: vendorConsentsRepositoryMock
    })

    useCase
      .getVendorConsents({vendorIds: givenVendorIds})
      .then(vendorConsents => {
        expect(
          vendorConsents,
          'should be the vendor consents obtained with the repository'
        ).to.deep.equal(vendorConsentsMock)
      })
      .then(() => done())
      .catch(e => done(e))
  })
  it('Should throw an UnexistingConsentDataError if there was no stored consent', done => {
    const vendorConsentsMock = undefined
    const vendorConsentsRepositoryMock = {
      getVendorConsents: () => vendorConsentsMock
    }

    const useCase = new GetVendorConsentsUseCase({
      vendorConsentsRepository: vendorConsentsRepositoryMock
    })

    useCase
      .getVendorConsents()
      .then(() => done(new Error('should have thrown an error')))
      .catch(e => {
        expect(e.name, 'should throw an UnexistingConsentDataError').to.equal(
          'UnexistingConsentDataError'
        )
        done()
      })
      .catch(e => done(e))
  })
})
