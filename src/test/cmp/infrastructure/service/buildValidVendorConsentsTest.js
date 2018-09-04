import {expect} from 'chai'
import buildValidVendorConsents from '../../../../cmp/application/services/vendor_consents/buildValidVendorConsents'

describe('buildValidVendorConsents', () => {
  describe('Given a valid object populated with number keys and boolean values', () => {
    it('Should return an array with the id keys which values are evaluated to true', done => {
      const givenObject = {
        vendorConsents: {
          1: true,
          2: false,
          3: true,
          4: false,
          5: true
        },
        purposeConsents: {
          1: true,
          2: false,
          3: true
        }
      }
      const expectedResult = {
        vendorConsents: [1, 3, 5],
        purposeConsents: [1, 3]
      }
      buildValidVendorConsents(givenObject)
        .then(consents => {
          expect(consents, 'should contain the true valued keys').to.deep.equal(
            expectedResult
          )
          done()
        })
        .catch(error => done(new Error(error)))
    })
  })
  describe('Given an invalid object populated with data', () => {
    it('Should reject with an invalid format error', done => {
      const expectedError = 'VendorConsentsFormatError'
      const givenObject = {
        1: true,
        2: false,
        3: true,
        what: true,
        '4': true,
        5: 'not a boolean'
      }
      buildValidVendorConsents(givenObject)
        .then(consents => {
          done(new Error(`done shouldn't be called with consents ${consents}`))
        })
        .catch(error => {
          expect(
            error.name,
            'should be of type VendorConsentsFormatError'
          ).to.deep.equal(expectedError)
          done()
        })
    })

    it('Should reject with an invalid entry error', done => {
      const expectedError = 'VendorConsentsEntryError'
      const givenObject = {
        vendorConsents: {
          bad_key: true,
          2: false,
          3: true,
          4: false,
          5: true
        },
        purposeConsents: {
          1: 'wrong here',
          2: false,
          3: true
        }
      }
      buildValidVendorConsents(givenObject)
        .then(consents => {
          done(
            new Error(
              `done shouldn't be called with consents ${Object.entries(
                consents
              )}`
            )
          )
        })
        .catch(error => {
          expect(
            error.name,
            'should be of type VendorConsentsEntryError'
          ).to.deep.equal(expectedError)
          done()
        })
    })
  })
})
