/* eslint-disable no-undef */
import IframeConsentRepository from '../repository/IframeConsentRepository'
import IframeRegistry from '../service/IframeRegistry'
import IframeCommunication from '../controller/IframeCommunication'
import BaseConsentContainer from './BaseConsentContainer'
import Configuration from '../configuration/Configuration'

export default class GlobalConsentContainer extends BaseConsentContainer {
  constructor({config, window, eager = true} = {}) {
    super({
      config: new Configuration({
        gdpr: config.gdpr,
        consent: config.consent,
        httpVendorList: config.httpVendorList,
        log: config.log,
        cmpVersion: CMP_VERSION
      }),
      window,
      eager: false
    })
    if (eager) this._buildEagerSingletonInstances()
  }

  _buildConsentRepository() {
    return new IframeConsentRepository()
  }

  _buildIframeRegistry() {
    return new IframeRegistry({
      dom: window.document
    })
  }

  _buildIframeCommunication() {
    return new IframeCommunication({window})
  }

  _buildEagerSingletonInstances() {
    this.getInstance({key: 'IframeRegistry'})
    this.getInstance({key: 'IframeCommunication'})
  }
}
