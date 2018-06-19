/* eslint-disable prettier/prettier */
import {expect} from 'chai'
import sinon from 'sinon'
import HttpVendorRepository from '../../../../src/cmp/infrastructure/repository/HttpVendorRepository'

describe('HTTP Vendor Repository', () => {
    describe('getGlobalVendorList', () => {
        it('Should fetch the remote vendor list JSON, using the default location if none is given', done => {
            const repository = new HttpVendorRepository()

            const expectedResult = {
                key: 'value'
            }
            const fetchMock = {
                fetch: () => ({
                    json: () => expectedResult
                })
            }
            const fetchSpy = sinon.spy(fetchMock, 'fetch')
            global.fetch = fetchMock.fetch


            repository.getGlobalVendorList()
                .then(result => {
                    expect(fetchSpy.calledOnce, 'should have called the remote fetch method').to.be.true
                    expect(fetchSpy.args[0][0], 'should retrieve the IAB vendor list by default').to.equal('https://vendorlist.consensu.org/vendorlist.json')
                    expect(result, 'should return the fetched value as json output format').to.deep.equal(expectedResult)
                })
                .then(() => done())
                .catch(e => done(e))
        })
        it('Should fetch the remote vendor list JSON, using the given vendor list location', done => {
            const givenVendorListLocation = 'http://whatever.consent/location/list.json'
            const repository = new HttpVendorRepository({globalVendorListLocation: givenVendorListLocation})

            const fetchMock = {
                fetch: () => ({
                    json: () => null
                })
            }
            const fetchSpy = sinon.spy(fetchMock, 'fetch')
            global.fetch = fetchMock.fetch


            repository.getGlobalVendorList()
                .then(result => {
                    expect(fetchSpy.calledOnce, 'should have called the remote fetch method').to.be.true
                    expect(fetchSpy.args[0][0], 'should retrieve the IAB vendor list by default').to.equal(givenVendorListLocation)
                })
                .then(() => done())
                .catch(e => done(e))
        })
    })
})
