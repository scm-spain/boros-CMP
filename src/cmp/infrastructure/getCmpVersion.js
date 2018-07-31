const getCmpVersion = () => {
  return process.env.npm_package_version
    ? process.env.npm_package_version.split('.')[0]
    : DEFAULT_CMP_VERSION
}
const DEFAULT_CMP_VERSION = '1'
export default getCmpVersion
