/* eslint-disable no-undef */
import IframeConsentRepository from '../../repository/IframeConsentRepository'
import IframeCommunication from '../../controller/IframeCommunication'
import BaseConsentContainer from '../BaseConsentContainer'
import IframeCommunicationClient from '../../service/iframe_communication/IframeCommunicationClient'
import UUIDV4Generator from '../../service/UUIDV4Generator'
import uuidv4 from 'uuid/v4'

export default class GlobalConsentContainer extends BaseConsentContainer {
  constructor({
    config,
    window,
    iframe,
    cmpVersion = CMP_VERSION,
    eager = true
  } = {}) {
    super({config, cmpVersion, window, eager: false})
    this._iframe = iframe
    if (eager) this._buildEagerSingletonInstances()
  }

  _buildConsentRepository() {
    return new IframeConsentRepository({
      iframeCommunicationClient: this.getInstance({
        key: 'IframeCommunicationClient'
      }),
      vendorListRepository: this.getInstance({
        key: 'VendorListRepository'
      }),
      consentFactory: this.getInstance({
        key: 'ConsentFactory'
      })
    })
  }

  _buildIframeCommunicationClient() {
    return new IframeCommunicationClient({
      idGenerator: this.getInstance({key: 'IdGenerator'}),
      origin: this._window,
      target: this._iframe
    })
  }

  _buildIdGenerator() {
    return new UUIDV4Generator({
      uuidv4: uuidv4
    })
  }

  _buildIframeCommunication() {
    return new IframeCommunication({window: this._window})
  }

  _buildEagerSingletonInstances() {
    this.getInstance({key: 'IframeCommunication'})
  }
}
