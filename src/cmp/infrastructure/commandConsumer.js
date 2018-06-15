const commandConsumer = log => cmp => (command, parameters, observer) => {
  return Promise.resolve()
    .then(() => log.debug('Received command:', command))
    .then(() => {
      if (command && typeof cmp[command] === 'function') {
        return Promise.resolve(cmp[command](parameters))
          .then(result => observer(...result))
          .then(null)
      } else {
        return Promise.reject(new Error('Unexisting command: ' + command))
      }
    })
    .catch(e => log.error('Error executing command:', command, '-', e.message))
}
export default commandConsumer
