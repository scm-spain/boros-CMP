import {expect} from 'chai'
import sinon from 'sinon'
import HttpVendorListRepository from '../../../../cmp/infrastructure/repository/HttpVendorListRepository'

describe('HttpVendorListRepository', () => {
  describe('getGlobalVendorList', () => {
    it('Should fetch the remote vendor list JSON, using the given vendor list location', done => {
      const givenVendorListHost = 'http://cmp.schibsted.com'
      const givenVendorListFilename = 'givenVendorList.json'
      const expectedUrl = 'http://cmp.schibsted.com/givenVendorList.json'

      const expectedResult = {
        key: 'value'
      }
      const fetchMock = {
        fetch: () => ({
          json: () => expectedResult,
          ok: true
        })
      }
      const fetchSpy = sinon.spy(fetchMock, 'fetch')

      const repository = new HttpVendorListRepository({
        fetcher: fetchMock.fetch,
        vendorListFilename: givenVendorListFilename,
        vendorListHost: givenVendorListHost
      })

      repository
        .getGlobalVendorList()
        .then(result => {
          expect(
            fetchSpy.calledOnce,
            'should have called the remote fetch method'
          ).to.be.true
          expect(
            fetchSpy.args[0][0],
            'should retrieve the IAB vendor list by default'
          ).to.equal(expectedUrl)
          expect(
            result,
            'should return the fetched value as json output format'
          ).to.deep.equal(expectedResult)
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should throw a GlobalVendorListAccessError if the global vendor list cannot be fetched', done => {
      const givenVendorListHost = 'http://cmp.schibsted.com'
      const givenVendorListFilename = 'givenVendorList.json'

      const fetchMock = {
        fetch: () => ({
          json: () => null,
          ok: false
        })
      }

      const repository = new HttpVendorListRepository({
        fetcher: fetchMock.fetch,
        vendorListFilename: givenVendorListFilename,
        vendorListHost: givenVendorListHost
      })

      repository
        .getGlobalVendorList()
        .then(() =>
          done(
            new Error(
              'should throw an error because the fetch response is not ok'
            )
          )
        )
        .catch(e => {
          if (e.name === 'GlobalVendorListAccessError') {
            done()
          } else {
            throw new Error(
              `should throw a GlobalVendorListAccessError instead of ${e.name}`
            )
          }
        })
        .catch(e => done(e))
    })
  })
})
