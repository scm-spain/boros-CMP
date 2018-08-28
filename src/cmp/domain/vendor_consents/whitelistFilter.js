export const isWhitelisted = ({whitelist, id}) =>
  !whitelist || whitelist.indexOf(id) >= 0
