import {expect} from 'chai'
import sinon from 'sinon'
import HttpVendorListRepository from '../../../../cmp/infrastructure/repository/HttpVendorListRepository'
import {
  latestVendorListLocator,
  versionVendorListLocator
} from '../../../../cmp/domain/iabVendorListLocator'

describe('HttpVendorListRepository', () => {
  describe('getGlobalVendorList', () => {
    it('Should fetch the remote vendor list JSON, using the default location if none is given', done => {
      const repository = new HttpVendorListRepository({
        latestLocator: latestVendorListLocator,
        versionLocator: versionVendorListLocator
      })

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
      global.fetch = fetchMock.fetch

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
          ).to.equal('https://vendorlist.consensu.org/vendorlist.json')
          expect(
            result,
            'should return the fetched value as json output format'
          ).to.deep.equal(expectedResult)
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should fetch the remote vendor list JSON, using the given vendor list location', done => {
      const givenVendorListLocator = () =>
        'http://whatever.consent/location/list.json'
      const repository = new HttpVendorListRepository({
        latestLocator: givenVendorListLocator
      })

      const fetchMock = {
        fetch: () => ({
          json: () => null,
          ok: true
        })
      }
      const fetchSpy = sinon.spy(fetchMock, 'fetch')
      global.fetch = fetchMock.fetch

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
          ).to.equal(givenVendorListLocator())
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should throw a GlobalVendorListAccessError if the global vendor list cannot be fetched', done => {
      const repository = new HttpVendorListRepository({
        latestLocator: latestVendorListLocator,
        versionLocator: versionVendorListLocator
      })

      const fetchMock = {
        fetch: () => ({
          json: () => null,
          ok: false
        })
      }
      global.fetch = fetchMock.fetch

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
