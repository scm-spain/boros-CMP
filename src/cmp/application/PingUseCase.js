export default class PingUseCase {
  /**
   * The "ping" command invokes the callback immediately with information about whether the main CMP script
   * has loaded yet and if GDPR has been configured for all users or just EU users. (This requires this
   * command's implementation and this configuration to be in the stub).
   */
  ping() {
    return Promise.resolve().then(() => ({
      gdprAppliesGlobally: false, // TODO global feature not supported yet
      cmpLoaded: true
    }))
  }
}
