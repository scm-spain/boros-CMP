import {expect} from 'chai'
import InMemoryVendorListRepository from '../../../../src/cmp/infrastructure/repository/InMemoryVendorListRepository'

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
      const givenGlobalVendorList = {what: 'ever'}
      const repository = new InMemoryVendorListRepository({
        globalVendorList: givenGlobalVendorList
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
    it('Should update the stored global vendor list', done => {
      const givenInitialGlobalVendorList = {what: 'ever'}
      const givenUpdatedGlobalVendorList = {what: 'ever', up: 'dated'}
      const repository = new InMemoryVendorListRepository({
        globalVendorList: givenInitialGlobalVendorList
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
