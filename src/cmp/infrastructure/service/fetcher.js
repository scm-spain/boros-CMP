import fetch from 'isomorphic-unfetch'

const fetcherFactory = () => (url, options) => fetch(url, options)

export {fetcherFactory}
