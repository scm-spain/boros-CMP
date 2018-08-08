const commandConsumer = log => cmpFacade => (command, parameters, observer) =>
  Promise.resolve()
    .then(() => log.debug('Received command:', command))
    .then(() => filterCommandIsFunction({controller: cmpFacade, command}))
    .then(() =>
      Promise.race([
        Promise.resolve(true),
        callCommand({log, cmpFacade, command, parameters, observer})
      ])
    )
    .catch(e => {
      log.error('Error:', command, '-', e.message)
      return false
    })

export default commandConsumer

const callCommand = ({
  log,
  cmpFacade,
  command,
  parameters,
  observer = () => null
} = {}) =>
  Promise.resolve()
    .then(() => cmpFacade[command](parameters))
    .then(result => observer(result, true))
    .catch(e => {
      log.error('Error calling command:', command, '-', e.message)
      observer(null, false)
    })

const filterCommandIsFunction = ({controller, command}) => {
  if (command && typeof controller[command] === 'function') {
    return Promise.resolve(command)
  } else {
    return Promise.reject(new Error('Unexisting command: ' + command))
  }
}
