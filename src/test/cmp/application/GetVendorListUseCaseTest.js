import {expect} from 'chai'
import sinon from 'sinon'
import GetVendorListUseCase from '../../../cmp/application/services/GetVendorListUseCase'

describe('Get Vendor List Use Case', () => {
  it('Should return the global vendor list', done => {
    const expectedResult = 'whatever result'
    const vendorListRepositoryMock = {
      getGlobalVendorList: () => Promise.resolve(expectedResult)
    }

    const useCase = new GetVendorListUseCase({
      vendorListRepository: vendorListRepositoryMock
    })

    const getGlobalVendorListSpy = sinon.spy(
      vendorListRepositoryMock,
      'getGlobalVendorList'
    )

    useCase
      .getVendorList()
      .then(result => {
        expect(
          getGlobalVendorListSpy.calledOnce,
          'result should be the vendor list returned by the repository'
        ).to.be.true
        expect(
          result,
          'result should be the vendor list returned by the repository'
        ).to.deep.equal(expectedResult)
      })
      .then(() => done())
      .catch(e => done(e))
  })
})
