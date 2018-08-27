export const debugHandler = logger => ({
  get: (target, propKey) => {
    logger.debug(
      `Reading property "${propKey}" type of ${typeof target[
        propKey
      ]} from class ${target.constructor.name}`
    )

    return target[propKey]
  }
})
