import {expect} from 'chai'
import {
  ALL_ALLOWED,
  ALL_DISALLOWED,
  CUSTOM_ALLOWED
} from '../../../../cmp/domain/consent/consentValidation'
import {
  NewVendorsStatusService,
  OPTION_ALL_ALLOW,
  OPTION_ALL_DISMISS,
  OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE,
  OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE
} from '../../../../cmp/domain/vendor_consents/NewVendorsStatusService'

describe('NewVendorsStatusService', () => {
  const sampleArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  describe('OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE', () => {
    it('Should return true if all vendors were accepted', done => {
      const givenAcceptedVendorIds = sampleArray.slice(0, 5)
      const givenAllowedVendorIds = givenAcceptedVendorIds
      const givenGlobalVendorIds = sampleArray

      const service = new NewVendorsStatusService({
        option: OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE
      })
      service
        .getNewVendorsStatus({
          acceptedVendorIds: givenAcceptedVendorIds,
          globalVendorIds: givenGlobalVendorIds,
          allowedVendorIds: givenAllowedVendorIds
        })
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be true').to.be.true
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should return true if vendors were customized, but not all rejected', done => {
      const givenAcceptedVendorIds = sampleArray.slice(0, 5)
      const givenGlobalVendorIds = sampleArray
      const givenAllowedVendorIds = givenGlobalVendorIds
      const service = new NewVendorsStatusService({
        option: OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE
      })
      service
        .getNewVendorsStatus({
          acceptedVendorIds: givenAcceptedVendorIds,
          globalVendorIds: givenGlobalVendorIds,
          allowedVendorIds: givenAllowedVendorIds
        })
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be true').to.be.true
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should return false if vendors were all rejected', done => {
      const givenAcceptedVendorIds = []
      const givenGlobalVendorIds = sampleArray
      const givenAllowedVendorIds = givenGlobalVendorIds
      const service = new NewVendorsStatusService({
        option: OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE
      })
      service
        .getNewVendorsStatus({
          acceptedVendorIds: givenAcceptedVendorIds,
          globalVendorIds: givenGlobalVendorIds,
          allowedVendorIds: givenAllowedVendorIds
        })
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be false').to.be.false
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
  describe('OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE', () => {
    it('Should return true if all vendors were accepted', done => {
      const givenAcceptedVendorIds = sampleArray.slice(0, 5)
      const givenAllowedVendorIds = givenAcceptedVendorIds
      const givenGlobalVendorIds = sampleArray
      const service = new NewVendorsStatusService({
        option: OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE
      })
      service
        .getNewVendorsStatus({
          acceptedVendorIds: givenAcceptedVendorIds,
          globalVendorIds: givenGlobalVendorIds,
          allowedVendorIds: givenAllowedVendorIds
        })
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be true').to.be.true
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should return false if vendors were customized, but not all rejected', done => {
      const givenAcceptedVendorIds = sampleArray.slice(0, 5)
      const givenGlobalVendorIds = sampleArray
      const givenAllowedVendorIds = givenGlobalVendorIds
      const service = new NewVendorsStatusService({
        option: OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE
      })
      service
        .getNewVendorsStatus({
          acceptedVendorIds: givenAcceptedVendorIds,
          globalVendorIds: givenGlobalVendorIds,
          allowedVendorIds: givenAllowedVendorIds
        })
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be false').to.be.false
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should return false if vendors were all rejected', done => {
      const givenAcceptedVendorIds = []
      const givenGlobalVendorIds = sampleArray
      const givenAllowedVendorIds = givenGlobalVendorIds
      const service = new NewVendorsStatusService({
        option: OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE
      })
      service
        .getNewVendorsStatus({
          acceptedVendorIds: givenAcceptedVendorIds,
          globalVendorIds: givenGlobalVendorIds,
          allowedVendorIds: givenAllowedVendorIds
        })
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be false').to.be.false
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
  describe('OPTION_ALL_DISMISS', () => {
    it('Should return false if all vendors were accepted', done => {
      const givenAcceptedVendorIds = sampleArray.slice(0, 5)
      const givenAllowedVendorIds = givenAcceptedVendorIds
      const givenGlobalVendorIds = sampleArray
      const service = new NewVendorsStatusService({
        option: OPTION_ALL_DISMISS
      })
      service
        .getNewVendorsStatus({
          acceptedVendorIds: givenAcceptedVendorIds,
          globalVendorIds: givenGlobalVendorIds,
          allowedVendorIds: givenAllowedVendorIds
        })
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be false').to.be.false
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should return false if vendors were customized, but not all rejected', done => {
      const givenAcceptedVendorIds = sampleArray.slice(0, 5)
      const givenGlobalVendorIds = sampleArray
      const givenAllowedVendorIds = givenGlobalVendorIds
      const service = new NewVendorsStatusService({
        option: OPTION_ALL_DISMISS
      })
      service
        .getNewVendorsStatus({
          acceptedVendorIds: givenAcceptedVendorIds,
          globalVendorIds: givenGlobalVendorIds,
          allowedVendorIds: givenAllowedVendorIds
        })
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be false').to.be.false
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should return false if vendors were all rejected', done => {
      const givenAcceptedVendorIds = []
      const givenGlobalVendorIds = sampleArray
      const givenAllowedVendorIds = givenGlobalVendorIds
      const service = new NewVendorsStatusService({
        option: OPTION_ALL_DISMISS
      })
      service
        .getNewVendorsStatus({
          acceptedVendorIds: givenAcceptedVendorIds,
          globalVendorIds: givenGlobalVendorIds,
          allowedVendorIds: givenAllowedVendorIds
        })
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be false').to.be.false
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
  describe('OPTION_ALL_ALLOW', () => {
    it('Should return true if all vendors were accepted', done => {
      const givenAcceptedVendorIds = sampleArray.slice(0, 5)
      const givenAllowedVendorIds = givenAcceptedVendorIds
      const givenGlobalVendorIds = sampleArray
      const service = new NewVendorsStatusService({
        option: OPTION_ALL_ALLOW
      })
      service
        .getNewVendorsStatus({
          acceptedVendorIds: givenAcceptedVendorIds,
          globalVendorIds: givenGlobalVendorIds,
          allowedVendorIds: givenAllowedVendorIds
        })
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be true').to.be.true
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should return false if vendors were customized, but not all rejected', done => {
      const givenAcceptedVendorIds = sampleArray.slice(0, 5)
      const givenGlobalVendorIds = sampleArray
      const givenAllowedVendorIds = givenGlobalVendorIds
      const service = new NewVendorsStatusService({
        option: OPTION_ALL_ALLOW
      })
      service
        .getNewVendorsStatus({
          acceptedVendorIds: givenAcceptedVendorIds,
          globalVendorIds: givenGlobalVendorIds,
          allowedVendorIds: givenAllowedVendorIds
        })
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be true').to.be.true
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should return false if vendors were all rejected', done => {
      const givenAcceptedVendorIds = []
      const givenGlobalVendorIds = sampleArray
      const givenAllowedVendorIds = givenGlobalVendorIds
      const service = new NewVendorsStatusService({
        option: OPTION_ALL_ALLOW
      })
      service
        .getNewVendorsStatus({
          acceptedVendorIds: givenAcceptedVendorIds,
          globalVendorIds: givenGlobalVendorIds,
          allowedVendorIds: givenAllowedVendorIds
        })
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be true').to.be.true
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
})
