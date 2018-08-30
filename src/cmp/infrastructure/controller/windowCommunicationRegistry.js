const registerWindowCMP = ({cmp, window}) =>
  Promise.resolve().then(() => (window.__cmp = cmp))

export default registerWindowCMP
