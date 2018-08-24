import {expect} from 'chai'
import NewVendorsStatusFactory from '../../../../cmp/domain/vendor_consents/NewVendorsStatusFactory'
import {
  ALL_ALLOWED,
  ALL_DISALLOWED,
  CUSTOM_ALLOWED
} from '../../../../cmp/domain/consent/consentValidation'

describe('NewVendorsStatusFactory', () => {
  describe('OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE', () => {
    it('Should return true if all vendors were accepted', done => {
      const factory = new NewVendorsStatusFactory({
        option: 'OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE'
      })
      factory
        .from({acceptationStatus: ALL_ALLOWED})
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be true').to.be.true
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should return true if vendors were customized, but not all rejected', done => {
      const factory = new NewVendorsStatusFactory({
        option: 'OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE'
      })
      factory
        .from({acceptationStatus: CUSTOM_ALLOWED})
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be true').to.be.true
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should return false if vendors were all rejected', done => {
      const factory = new NewVendorsStatusFactory({
        option: 'OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE'
      })
      factory
        .from({acceptationStatus: ALL_DISALLOWED})
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be false').to.be.false
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
  describe('OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE', () => {
    it('Should return true if all vendors were accepted', done => {
      const factory = new NewVendorsStatusFactory({
        option: 'OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE'
      })
      factory
        .from({acceptationStatus: ALL_ALLOWED})
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be true').to.be.true
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should return false if vendors were customized, but not all rejected', done => {
      const factory = new NewVendorsStatusFactory({
        option: 'OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE'
      })
      factory
        .from({acceptationStatus: CUSTOM_ALLOWED})
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be false').to.be.false
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should return false if vendors were all rejected', done => {
      const factory = new NewVendorsStatusFactory({
        option: 'OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE'
      })
      factory
        .from({acceptationStatus: ALL_DISALLOWED})
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be false').to.be.false
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
  describe('OPTION_ALL_DISMISS', () => {
    it('Should return false if all vendors were accepted', done => {
      const factory = new NewVendorsStatusFactory({
        option: 'OPTION_ALL_DISMISS'
      })
      factory
        .from({acceptationStatus: ALL_ALLOWED})
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be false').to.be.false
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should return false if vendors were customized, but not all rejected', done => {
      const factory = new NewVendorsStatusFactory({
        option: 'OPTION_ALL_DISMISS'
      })
      factory
        .from({acceptationStatus: CUSTOM_ALLOWED})
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be false').to.be.false
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should return false if vendors were all rejected', done => {
      const factory = new NewVendorsStatusFactory({
        option: 'OPTION_ALL_DISMISS'
      })
      factory
        .from({acceptationStatus: ALL_DISALLOWED})
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be false').to.be.false
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
  describe('OPTION_ALL_ALLOW', () => {
    it('Should return true if all vendors were accepted', done => {
      const factory = new NewVendorsStatusFactory({
        option: 'OPTION_ALL_ALLOW'
      })
      factory
        .from({acceptationStatus: ALL_ALLOWED})
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be true').to.be.true
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should return false if vendors were customized, but not all rejected', done => {
      const factory = new NewVendorsStatusFactory({
        option: 'OPTION_ALL_ALLOW'
      })
      factory
        .from({acceptationStatus: CUSTOM_ALLOWED})
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be true').to.be.true
        })
        .then(() => done())
        .catch(e => done(e))
    })
    it('Should return false if vendors were all rejected', done => {
      const factory = new NewVendorsStatusFactory({
        option: 'OPTION_ALL_ALLOW'
      })
      factory
        .from({acceptationStatus: ALL_DISALLOWED})
        .then(newVendorsStatus => {
          expect(newVendorsStatus, 'should be true').to.be.true
        })
        .then(() => done())
        .catch(e => done(e))
    })
  })
})
