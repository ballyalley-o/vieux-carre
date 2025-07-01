/* eslint-disable @typescript-eslint/no-unused-vars */
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

  public response(success: boolean, message: string, code?: CODE, data?: unknown) {
    return { success, status: code, message, data }
  }

  public redirectResponse(message: string, code?: CODE, redirectTo?: string, data?: unknown) {
    return { status: code, success: true, message, redirectTo, data }
  }

  public errorResponse(error: AppError | string, code: CODE, _tag: string = TAG_DEFAULT, redirectTo?: string, data?: unknown) {
    return { success: false, status: code, message: errorHandler(error as AppError), redirectTo, data }
  }

  public errorMessage(message: string, code: CODE, _tag: string = TAG_DEFAULT) {
    return { success: false, status: code, message }
  }

  public info(content: string, tag: string = TAG_DEFAULT) {
    console.info(TAG_FORMAT(tag), content)
  }

  public log(content: string, tag: string = TAG_DEFAULT) {
    console.log(TAG_FORMAT(tag), content)
  }
}

export const SystemLogger = AppLogger.getInstance()
