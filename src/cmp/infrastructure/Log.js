class Log {
  constructor({level = LEVEL.off, console} = {}) {
    this._level = (this._isValidLevel({level}) && level) || LEVEL.off
    this._console = console || NO_CONSOLE
  }
  changeLevel({level}) {
    this._level = (this._isValidLevel({level}) && level) || this._level
  }
  get level() {
    return this._level
  }
  debug(...args) {
    if (this._level <= LEVEL.debug) {
      this._print({logMethod: this._console.log, level: 'DEBUG', args})
    }
  }
  info(...args) {
    if (this._level <= LEVEL.info) {
      this._print({logMethod: this._console.info, level: 'INFO', args})
    }
  }
  warn(...args) {
    if (this._level <= LEVEL.warn) {
      this._print({logMethod: this._console.warn, level: 'WARN', args})
    }
  }
  error(...args) {
    if (this._level <= LEVEL.error) {
      this._print({logMethod: this._console.error, level: 'ERROR', args})
    }
  }
  _print({logMethod, level, args}) {
    const [message, ...rest] = [...args]
    logMethod(`[${level}] CMP - ${message}`, ...rest)
  }
  _isValidLevel({level}) {
    return level >= LEVEL.debug && level <= LEVEL.off
  }
}
const LEVEL = {
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  off: 5
}
const NO_CONSOLE = {
  log: () => null,
  info: () => null,
  warn: () => null,
  error: () => null
}
export {Log, LEVEL}
