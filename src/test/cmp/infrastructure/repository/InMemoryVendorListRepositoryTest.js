import {expect} from 'chai'
import InMemoryVendorListRepository from '../../../../cmp/infrastructure/repository/InMemoryVendorListRepository'

describe('InMemoryVendorListRepository', () => {
  describe('getGlobalVendorList', () => {
    it('Should return undefined if no globalVendorList is set', done => {
      const repository = new InMemoryVendorListRepository()

      repository
        .getGlobalVendorList()
        .then(result => {
          expect(result, 'the global vendor list should be undefined').to.be
            .undefined
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should return the stored globalVendorList if is set', done => {
      const givenGlobalVendorList = {vendorListVersion: 1}
      const repository = new InMemoryVendorListRepository({
        initialVendorList: givenGlobalVendorList
      })

      repository
        .getGlobalVendorList()
        .then(result => {
          expect(
            result,
            'the global vendor list should be the given vendor list'
          ).to.deep.equal(givenGlobalVendorList)
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should return the global vendor list with a specific version number', done => {
      const givenGlobalVendorList = {vendorListVersion: 4}
      const repository = new InMemoryVendorListRepository({
        initialVendorList: givenGlobalVendorList
      })

      repository
        .getGlobalVendorList({vendorListVersion: 4})
        .then(result => {
          expect(
            result,
            'the global vendor list should be the given vendor list'
          ).to.deep.equal(givenGlobalVendorList)
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
  describe('setGlobalVendorList', () => {
    it('Should update the stored global vendor list', done => {
      const givenInitialGlobalVendorList = {vendorListVersion: 1}
      const givenUpdatedGlobalVendorList = {vendorListVersion: 2}
      const repository = new InMemoryVendorListRepository({
        initialVendorList: givenInitialGlobalVendorList
      })

      repository
        .setGlobalVendorList({globalVendorList: givenUpdatedGlobalVendorList})
        .then(() => repository.getGlobalVendorList())
        .then(result => {
          expect(
            result,
            'the global vendor list should be the updated vendor list'
          ).to.deep.equal(givenUpdatedGlobalVendorList)
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
})
