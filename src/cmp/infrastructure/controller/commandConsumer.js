const commandConsumer = log => controller => (
  command,
  parameters,
  observer
) => {
  return Promise.resolve()
    .then(() => log.debug('Received command:', command))
    .then(() => {
      if (command && typeof controller[command] === 'function') {
        return Promise.resolve(controller[command](parameters, observer)).then(
          null
        )
      } else {
        return Promise.reject(new Error('Unexisting command: ' + command))
      }
    })
    .catch(e => log.error('Error executing command:', command, '-', e.message))
}
export default commandConsumer
