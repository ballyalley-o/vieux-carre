import { CODE } from './code'
import { errorHandler } from 'lib/util'

export const RESPONSE = {
  /**
   * Success reponse formatter
   * @param message
   * @param code - default 200
   * @param redirectTo - redirect path
   * @param data - data
   * @returns  { code: number, success: boolean, message: string, redirectTo: string, data: unknown }
   */
  SUCCESS: (message: string, code: CODE = CODE.OK, redirectTo?: string, data?: unknown) => ({ code, success: true, message, redirectTo, data }),
  /**
   * Error response formatter
   * @param message
   * @param code
   * @param redirectTo
   * @returns
   */
  ERROR: (message: string, code = CODE.INTERNAL_SERVER_ERROR, redirectTo?: string, data?: unknown) => ({ code, success: false, message, redirectTo, data }),
  ERROR_FORMATTED: (message: AppError, code = CODE.INTERNAL_SERVER_ERROR) => ({ code, success: false, message: errorHandler(message) }),
  DEFAULT: { code: CODE.INTERNAL_SERVER_ERROR, success: false, message: '' }
}
