const commandConsumer = log => controller => (
  command,
  parameters,
  observer = () => null
) => {
  return Promise.resolve()
    .then(() => log.debug('Received command:', command))
    .then(() => filterCommandIsFunction({controller, command}))
    .then(validCommand => controller[validCommand](parameters, observer))
    .then(() => true)
    .catch(e => {
      log.error('Error executing command:', command, '-', e.message)
      return false
    })
}
export default commandConsumer

const filterCommandIsFunction = ({controller, command}) => {
  if (command && typeof controller[command] === 'function') {
    return Promise.resolve(command)
  } else {
    return Promise.reject(new Error('Unexisting command: ' + command))
  }
}
