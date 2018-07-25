import {JSDOM} from 'jsdom'
import FileVendorListRepository from './repository/FileVendorListRepository'
import IABConsentFactory from '../../src/cmp/infrastructure/factory/IABConsentFactory'
import initializeCMP from '../../src/cmp/infrastructure/cmpInitializer'
import CMPFacade from './application/CMPFacade'
import CookieConsentRepository from '../../src/cmp/infrastructure/repository/CookieConsentRepository'
import CookieHandler from '../../src/cmp/infrastructure/service/CookieHandler'

const consentFactory = new IABConsentFactory()
const vendorListRepository = new FileVendorListRepository()
const cookieHandler = new CookieHandler({
  dom: new JSDOM('<!DOCTYPE html><div id="forlayo">I\'m BATMAN!</div>').window
    .document
})
const consentRepository = new CookieConsentRepository({
  cookieHandler,
  consentFactory,
  vendorListRepository
})

const initializeTestClientCMP = () => {
  const cmp = initializeCMP({
    consentFactory,
    vendorListRepository,
    cookieHandler,
    consentRepository
  })
  return new CMPFacade({cmp})
}

export default initializeTestClientCMP
