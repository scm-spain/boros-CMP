import EventFormatError from '../infrastructure/event/EventFormatError'
import CommandNotFoundError from '../infrastructure/event/CommandNotFoundError'
import writeCookieCommandFactory from '../infrastructure/command/writeCookieCommandFactory'
import readCookieCommandFactory from '../infrastructure/command/readCookieCommandFactory'
import {POST_MESSAGE_TARGET_ORIGIN} from '../../cmp/infrastructure/configuration/postMessage'

const globalStorage = ({window, readCookieUseCase, writeCookieUseCase}) =>
  Promise.all([
    Promise.resolve(readCookieCommandFactory({readCookieUseCase})),
    Promise.resolve(writeCookieCommandFactory({writeCookieUseCase}))
  ])
    .then(([readCookieCommand, writeCookieCommand]) => ({
      READ_CONSENT_COMMAND: readCookieCommand,
      WRITE_CONSENT_COMMAND: writeCookieCommand
    }))
    .then(commands => {
      window.addEventListener('message', event => {
        Promise.resolve(event)
          .then(filterEventFormatIsValid)
          .then(filteredEvent => filterCommandIsValid(filteredEvent)(commands))
          .then(validCommand =>
            commands[validCommand]({
              input: {
                ...event.data.__cmpCall.parameter,
                callId: event.data.__cmpCall.callId
              }
            })
          )
          .then(response =>
            event.source.postMessage(response, POST_MESSAGE_TARGET_ORIGIN)
          )
          .catch(error => sendError({error, event}))
      })
    })

const filterEventFormatIsValid = event =>
  Promise.resolve(event).then(event => {
    if (
      event &&
      event.data &&
      event.data.__cmpCall &&
      event.data.__cmpCall.callId &&
      event.data.__cmpCall.command &&
      event.data.__cmpCall.parameter
    ) {
      return event
    }
    return Promise.reject(
      new EventFormatError(
        event.data && event.data.__cmpCall && event.data.__cmpCall.callId
      )
    )
  })

const filterCommandIsValid = event => commands =>
  Promise.resolve(event)
    .then(event => event.data.__cmpCall.command)
    .then(command =>
      typeof commands[command] === 'function'
        ? command
        : Promise.reject(new CommandNotFoundError(event.data.__cmpCall.callId))
    )

const sendError = ({error, event}) =>
  Promise.resolve(error)
    .then(error => ({
      __cmpReturn: {
        success: false,
        returnValue: error,
        callId: error.callId
      }
    }))
    .then(response =>
      event.source.postMessage(response, POST_MESSAGE_TARGET_ORIGIN)
    )

export default globalStorage
