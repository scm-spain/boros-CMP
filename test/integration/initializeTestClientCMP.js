import FileVendorListRepository from './repository/FileVendorListRepository'
import InMemoryConsentRepository from './repository/InMemoryConsentRepository'
import IABConsentFactory from '../../src/cmp/infrastructure/factory/IABConsentFactory'
import initializeCMP from '../../src/cmp/infrastructure/cmpInitializer'
import CMPFacade from './application/CMPFacade'

const consentFactory = new IABConsentFactory()
const vendorListRepository = new FileVendorListRepository()
const consentRepository = new InMemoryConsentRepository({
  consentFactory,
  vendorListRepository
})

const initializeTestClientCMP = () =>
  Promise.resolve()
    .then(() =>
      initializeCMP({consentFactory, vendorListRepository, consentRepository})
    )
    .then(cmp => new CMPFacade({cmp}))

export default initializeTestClientCMP
