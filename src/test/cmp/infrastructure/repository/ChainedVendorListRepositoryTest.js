import {expect} from 'chai'
import sinon from 'sinon'
import ChainedVendorListRepository from '../../../../cmp/infrastructure/repository/ChainedVendorListRepository'
import InMemoryVendorListRepository from '../../../../cmp/infrastructure/repository/InMemoryVendorListRepository'

describe('ChainedVendorListRepository', () => {
  describe('getGlobalVendorList', () => {
    it('Should return the inmemory vendor list if it is found', done => {
      const expectedResult = {vendorListVersion: 65}
      const expectedVersion = 65
      const inMemoryVendorListRepository = new InMemoryVendorListRepository({
        initialVendorList: expectedResult
      })
      const httpVendorListRepositoryMock = {
        getGlobalVendorList: () => Promise.resolve({vendorListVersion: 90})
      }
      const httpGetGlobalVendorListSpy = sinon.spy(
        httpVendorListRepositoryMock,
        'getGlobalVendorList'
      )

      const repository = new ChainedVendorListRepository({
        inMemoryVendorListRepository: inMemoryVendorListRepository,
        httpVendorListRepository: httpVendorListRepositoryMock
      })
      repository
        .getGlobalVendorList()
        .then(result => {
          expect(
            httpGetGlobalVendorListSpy.called,
            'should have not called the http repository'
          ).to.be.false
          expect(
            result,
            'the resulting vendor list should be the inmemory vendor list'
          ).to.deep.equal(expectedResult)
          expect(
            inMemoryVendorListRepository.latestVersion,
            'the resulting latest version is not the same'
          ).to.deep.equal(expectedVersion)
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should return the http vendor list if it is not found into the inmemory repository, and set it inmemory for next calls', done => {
      const inMemoryVendorListRepository = new InMemoryVendorListRepository()
      const httpVendorListRepositoryMock = {
        getGlobalVendorList: ({vendorListVersion}) =>
          Promise.resolve({vendorListVersion})
      }
      const inMemorySetGlobalVendorListSpy = sinon.spy(
        inMemoryVendorListRepository,
        'setGlobalVendorList'
      )
      const inMemoryGetGlobalVendorListSpy = sinon.spy(
        inMemoryVendorListRepository,
        'getGlobalVendorList'
      )
      const getGlobalVendorListSpy = sinon.spy(
        httpVendorListRepositoryMock,
        'getGlobalVendorList'
      )

      const repository = new ChainedVendorListRepository({
        inMemoryVendorListRepository: inMemoryVendorListRepository,
        httpVendorListRepository: httpVendorListRepositoryMock
      })

      const calls = [
        repository.getGlobalVendorList({vendorListVersion: 1}),
        repository.getGlobalVendorList({vendorListVersion: 1}),
        repository.getGlobalVendorList({vendorListVersion: 1}),
        repository.getGlobalVendorList({vendorListVersion: 2}),
        repository.getGlobalVendorList({vendorListVersion: 2}),
        repository.getGlobalVendorList({vendorListVersion: 2})
      ]

      Promise.allSettled(calls)
        .then(results => {
          expect(
            inMemoryGetGlobalVendorListSpy.callCount,
            'should have called the inmemory repository only once for each version, to get the vendor list from there first'
          ).to.be.equal(2)
          let v1 = 0
          let v2 = 0
          results.forEach(
            result => (result.value.vendorListVersion === 1 ? v1++ : v2++)
          )
          expect(v1, 'should retrive 3 vendor lists of version 1').to.equal(3)
          expect(v2, 'should retrive 3 vendor lists of version 2').to.equal(3)
          expect(
            getGlobalVendorListSpy.callCount,
            'should have called only once for each version the http resource GET'
          ).to.equal(2)
          expect(
            inMemorySetGlobalVendorListSpy.callCount,
            'should have called only once per version the set method of the inmemory repository only once'
          ).to.equal(2)
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
})
