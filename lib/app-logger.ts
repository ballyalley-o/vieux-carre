import { errorHandler } from 'lib'
import { CODE, RESPONSE } from 'lib/constant'

const TAG_FORMAT = (tag: string) => `[${tag}]`
const TAG_DEFAULT = 'NO_TAG'

class AppLogger {
  private static instance: AppLogger
  private constructor() {}

  static getInstance() {
    if (!AppLogger.instance) {
      AppLogger.instance = new AppLogger()
    }
    return AppLogger.instance
  }

  public error(errorRaw: AppError, tag: string = TAG_DEFAULT, target: string = 'NO_TRACE', content: string) {
    const stack = errorRaw instanceof Error ? errorRaw.stack : new Error().stack
    let lineInfo = ''
    if (stack) {
      const stackLines = stack.split('\n')
      if (stackLines.length > 1) {
        lineInfo = stackLines[1].trim()
      }
    }
    const targetLineInfo = `${target} @ ${lineInfo}`
    console.error(`ERROR: ${errorRaw}`, `TAG: ${TAG_FORMAT(tag)}`, targetLineInfo, content)
  }

  public response(message: string, code?: CODE, tag: string = TAG_DEFAULT) {
    console.info(TAG_FORMAT(tag), message)
    return RESPONSE.SUCCESS(message, code)
  }

  public errorResponse(message: AppError | string, code: CODE, tag: string = TAG_DEFAULT, redirectTo?: string) {
    console.error(`ERROR: ${message as Error}`, `TAG: ${TAG_FORMAT(tag)}`, `CODE:${code.toString()}`, message)
    return RESPONSE.ERROR(errorHandler(message as AppError), code, redirectTo)
  }

  public info(content: string, tag: string = TAG_DEFAULT) {
    console.info(TAG_FORMAT(tag), content)
  }

  public log(content: string, tag: string = TAG_DEFAULT) {
    console.log(TAG_FORMAT(tag), content)
  }
}

export const SystemLogger = AppLogger.getInstance()
