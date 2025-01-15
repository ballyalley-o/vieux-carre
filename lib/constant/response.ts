import { CODE } from './code'
import { errorHandler } from 'lib/util'

export const RESPONSE = {
  /*
   * Success response
   * @param code - default 200
   * @param message - message to be displayed
   * @returns  { code: number, success: boolean, message: string }
   */
  SUCCESS        : (message: string, code: CODE = CODE.OK) => ({ code, success: true, message }),
  ERROR          : (message: string, code = CODE.INTERNAL_SERVER_ERROR, redirectTo?: string) => ({ code, success: false, message, redirectTo}),
  ERROR_FORMATTED: (message: AppError, code = CODE.INTERNAL_SERVER_ERROR) => ({ code, success: false, message: errorHandler(message) }),
  DEFAULT        : { code: CODE.INTERNAL_SERVER_ERROR, success: false, message: '' }
}
