const getDomainFactory = ({window}) => () =>
  Promise.resolve()
    .then(() => (window.location && window.location.hostname) || '')
    .then(host => host.split('.'))
    .then(parts => (parts.length > 1 ? parts.slice(-2).join('.') : ''))

export default getDomainFactory
