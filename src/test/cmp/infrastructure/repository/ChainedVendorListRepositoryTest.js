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
      const expectedResult = {vendorListVersion: 65}
      const inMemoryVendorListRepository = new InMemoryVendorListRepository()
      const httpVendorListRepositoryMock = {
        getGlobalVendorList: () => Promise.resolve(expectedResult)
      }
      const inMemorySetGlobalVendorListSpy = sinon.spy(
        inMemoryVendorListRepository,
        'setGlobalVendorList'
      )
      const inMemoryGetGlobalVendorListSpy = sinon.spy(
        inMemoryVendorListRepository,
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
            inMemoryGetGlobalVendorListSpy.calledOnce,
            'should have called the inmemory repository -get- to try to get the vendor list from there first'
          ).to.be.true
          expect(
            result,
            'the resulting vendor list should be the http vendor list'
          ).to.deep.equal(expectedResult)
          expect(
            inMemorySetGlobalVendorListSpy.calledOnce,
            'should have called the set method of the inmemory repository'
          ).to.be.true
          expect(
            inMemorySetGlobalVendorListSpy.args[0][0].globalVendorList,
            'should store the http vendor list to the inmemory repository'
          ).to.deep.equal(expectedResult)
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
})
