export default class Log {
  constructor({console}) {
    this._console = console
  }

  debug(...args) {
    this._print({level: 'DEBUG', args})
  }

  error(...args) {
    this._print({level: 'ERROR', args})
  }

  _print({level, ...args}) {
    const [message, ...rest] = [...args]
    this._console.log(`[${level}] CMP - ${message}`, ...rest)
  }
}
