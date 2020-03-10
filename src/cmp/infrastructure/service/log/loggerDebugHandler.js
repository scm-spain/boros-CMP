export const debugHandler = logger => ({
  get: (target, propKey) => {
    const propertyType = typeof target[propKey]
    switch (propertyType) {
      case 'function':
        return (...args) => {
          logger.debug(
            `Function ${propKey} called from class ${target.constructor.name} with arguments:`,
            Object.entries(args)
          )
          return target[propKey].apply(target, args)
        }
      default:
        logger.debug(
          `Reading property "${propKey}" type of ${typeof target[
            propKey
          ]} from class ${target.constructor.name}`
        )
    }
    return target[propKey]
  }
})
