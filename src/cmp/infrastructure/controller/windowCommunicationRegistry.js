const registerWindowCMP = ({window, cmp}) =>
  Promise.resolve().then(() => (window.__cmp = cmp))

export default registerWindowCMP
