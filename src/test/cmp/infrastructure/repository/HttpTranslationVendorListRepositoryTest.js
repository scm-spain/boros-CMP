import {expect} from 'chai'
import sinon from 'sinon'
import GlobalVendorList from '../../../resources/globalvendorlist.json'
import TranslationES from '../../../resources/purposes-es.json'
import HttpTranslationVendorListRepository from '../../../../cmp/infrastructure/repository/HttpTranslationVendorListRepository'

describe('HttpTranslationVendorListRepository', () => {
  describe('getGlobalVendorList', () => {
    it('should load the remote vendor list and the translation file for the vendor list version and the specified language', done => {
      const givenConsentLanguage = 'es'
      const givenVendorListVersion = 74
      const expectedTranslationsUrl =
        'https://vendorlist.consensu.org/v-74/purposes-es.json'
      const fetchTranslationMock = {
        fetch: () => ({
          json: () => TranslationES,
          ok: true
        })
      }
      const fetchTranslationSpy = sinon.spy(fetchTranslationMock, 'fetch')
      const vendorListMock = {
        getGlobalVendorList: () => Promise.resolve(GlobalVendorList)
      }
      const repository = new HttpTranslationVendorListRepository({
        fetcher: fetchTranslationMock.fetch,
        vendorListRepository: vendorListMock,
        consentLanguage: givenConsentLanguage
      })
      repository
        .getGlobalVendorList({vendorListVersion: givenVendorListVersion})
        .then(vendorList => {
          expect(vendorList.vendors).to.deep.equal(GlobalVendorList.vendors)
          expect(vendorList.purposes).to.deep.equal(TranslationES.purposes)
          expect(vendorList.features).to.deep.equal(TranslationES.features)
          expect(vendorList.vendorListVersion).to.deep.equal(
            GlobalVendorList.vendorListVersion
          )
          expect(fetchTranslationSpy.calledOnce).to.be.true
          expect(
            fetchTranslationSpy.args[0][0],
            'incorrect translations URL'
          ).to.equal(expectedTranslationsUrl)
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('should load the remote vendor list without translation if the given language is not accepted', done => {
      const givenConsentLanguage = 'xx'
      const givenVendorListVersion = 74
      const fetchTranslationMock = {
        fetch: () => ({
          json: () => null,
          ok: false
        })
      }
      const vendorListMock = {
        getGlobalVendorList: () => Promise.resolve(GlobalVendorList)
      }
      const repository = new HttpTranslationVendorListRepository({
        fetcher: fetchTranslationMock.fetch,
        vendorListRepository: vendorListMock,
        consentLanguage: givenConsentLanguage
      })
      repository
        .getGlobalVendorList({vendorListVersion: givenVendorListVersion})
        .then(vendorList => {
          expect(vendorList).to.deep.equal(GlobalVendorList)
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('should load the no-version translations if no vendor list version is specified', done => {
      const givenConsentLanguage = 'es'
      const givenVendorListVersion = undefined
      const expectedTranslationsUrl =
        'https://vendorlist.consensu.org/purposes-es.json'
      const fetchTranslationMock = {
        fetch: () => ({
          json: () => TranslationES,
          ok: true
        })
      }
      const fetchTranslationSpy = sinon.spy(fetchTranslationMock, 'fetch')
      const vendorListMock = {
        getGlobalVendorList: () => Promise.resolve(GlobalVendorList)
      }
      const repository = new HttpTranslationVendorListRepository({
        fetcher: fetchTranslationMock.fetch,
        vendorListRepository: vendorListMock,
        consentLanguage: givenConsentLanguage
      })
      repository
        .getGlobalVendorList({vendorListVersion: givenVendorListVersion})
        .then(vendorList => {
          expect(fetchTranslationSpy.calledOnce).to.be.true
          expect(
            fetchTranslationSpy.args[0][0],
            'incorrect translations URL'
          ).to.equal(expectedTranslationsUrl)
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
})
