import {expect} from 'chai'
import sinon from 'sinon'
import {LEVEL, Log} from '../../../cmp/infrastructure/service/log/Log'

describe('Log', () => {
  describe('changeLevel', () => {
    it('Should update the log level to the new value', () => {
      const log = new Log({level: LEVEL.error})
      log.changeLevel({level: LEVEL.debug})
      expect(log.level, 'should set the level to debug').to.equal(LEVEL.debug)
    })
    it('Should keep the log level if received level is not valid', () => {
      const log = new Log({level: LEVEL.error})
      log.changeLevel({level: 2000})
      expect(log.level, 'should keep the level to error').to.equal(LEVEL.error)
    })
  })
  describe('debug', () => {
    it('Should call console log with args if level is debug', () => {
      const consoleMock = {
        log: () => null
      }
      const logSpy = sinon.spy(consoleMock, 'log')
      const log = new Log({level: LEVEL.debug, console: consoleMock})
      log.debug('message', 'some other', 'thing')
      expect(logSpy.calledOnce, 'should call the log method in console').to.be
        .true
      expect(
        logSpy.args[0],
        'should format the message and set the args to log'
      ).to.deep.equal(['[DEBUG] CMP - message', 'some other', 'thing'])
    })
    it('Should not log nothing if level is off', () => {
      const consoleMock = {
        log: () => null
      }
      const logSpy = sinon.spy(consoleMock, 'log')
      const log = new Log({level: LEVEL.off, console: consoleMock})
      log.debug('message', 'some other', 'thing')
      expect(logSpy.calledOnce, 'should call the log method in console').to.be
        .false
    })
    it('Should not log nothing if level is greater than debug', () => {
      const consoleMock = {
        log: () => null
      }
      const logSpy = sinon.spy(consoleMock, 'log')
      const log = new Log({level: LEVEL.info, console: consoleMock})
      log.debug('message', 'some other', 'thing')
      expect(logSpy.calledOnce, 'should call the log method in console').to.be
        .false
    })
  })
  describe('info', () => {
    it('Should call console info with args if level is info', () => {
      const consoleMock = {
        info: () => null
      }
      const logSpy = sinon.spy(consoleMock, 'info')
      const log = new Log({level: LEVEL.info, console: consoleMock})
      log.info('message', 'some other', 'thing')
      expect(logSpy.calledOnce, 'should call the log method in console').to.be
        .true
      expect(
        logSpy.args[0],
        'should format the message and set the args to log'
      ).to.deep.equal(['[INFO] CMP - message', 'some other', 'thing'])
    })
    it('Should not log nothing if level is off', () => {
      const consoleMock = {
        info: () => null
      }
      const logSpy = sinon.spy(consoleMock, 'info')
      const log = new Log({level: LEVEL.off, console: consoleMock})
      log.info('message', 'some other', 'thing')
      expect(logSpy.calledOnce, 'should call the info method in console').to.be
        .false
    })
    it('Should not log nothing if level is greater than info', () => {
      const consoleMock = {
        info: () => null
      }
      const logSpy = sinon.spy(consoleMock, 'info')
      const log = new Log({level: LEVEL.warn, console: consoleMock})
      log.info('message', 'some other', 'thing')
      expect(logSpy.calledOnce, 'should call the info method in console').to.be
        .false
    })
  })
  describe('warn', () => {
    it('Should call console warn with args if level is warn', () => {
      const consoleMock = {
        warn: () => null
      }
      const logSpy = sinon.spy(consoleMock, 'warn')
      const log = new Log({level: LEVEL.warn, console: consoleMock})
      log.warn('message', 'some other', 'thing')
      expect(logSpy.calledOnce, 'should call the warn method in console').to.be
        .true
      expect(
        logSpy.args[0],
        'should format the message and set the args to log'
      ).to.deep.equal(['[WARN] CMP - message', 'some other', 'thing'])
    })
    it('Should not log nothing if level is off', () => {
      const consoleMock = {
        warn: () => null
      }
      const logSpy = sinon.spy(consoleMock, 'warn')
      const log = new Log({level: LEVEL.off, console: consoleMock})
      log.info('message', 'some other', 'thing')
      expect(logSpy.calledOnce, 'should call the warn method in console').to.be
        .false
    })
    it('Should not log nothing if level is greater than info', () => {
      const consoleMock = {
        warn: () => null
      }
      const logSpy = sinon.spy(consoleMock, 'warn')
      const log = new Log({level: LEVEL.ERROR, console: consoleMock})
      log.warn('message', 'some other', 'thing')
      expect(logSpy.calledOnce, 'should call the warn method in console').to.be
        .false
    })
  })
  describe('error', () => {
    it('Should call console error with args if level is warn', () => {
      const consoleMock = {
        error: () => null
      }
      const logSpy = sinon.spy(consoleMock, 'error')
      const log = new Log({level: LEVEL.error, console: consoleMock})
      log.error('message', 'some other', 'thing')
      expect(logSpy.calledOnce, 'should call the error method in console').to.be
        .true
      expect(
        logSpy.args[0],
        'should format the message and set the args to log'
      ).to.deep.equal(['[ERROR] CMP - message', 'some other', 'thing'])
    })
    it('Should not log nothing if level is off', () => {
      const consoleMock = {
        error: () => null
      }
      const logSpy = sinon.spy(consoleMock, 'error')
      const log = new Log({level: LEVEL.off, console: consoleMock})
      log.error('message', 'some other', 'thing')
      expect(logSpy.calledOnce, 'should call the error method in console').to.be
        .false
    })
  })
})
