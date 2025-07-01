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
  SUCCESS: (message: string, code: CODE = CODE.OK, data?: unknown) => ({ status: code, success: true, message, data }),
  /**
   * Success Redirect reponse formatter
   * @param message
   * @param code - default 200
   * @param redirectTo - redirect path
   * @param data - data
   * @returns  { code: number, success: boolean, message: string, redirectTo: string, data: unknown }
   */
  SUCCESS_REDIRECT: (message: string, code: CODE = CODE.OK, redirectTo?: string, data?: unknown) => ({ code, success: true, message, redirectTo, data }),
  /**
   * Error response formatter
   * @param message
   * @param code
   * @param redirectTo
   * @returns
   */
  ERROR: (message: string, code = CODE.INTERNAL_SERVER_ERROR, redirectTo?: string, data?: unknown) => ({
    status: code,
    success: false,
    message,
    redirectTo,
    data
  }),
  ERROR_FORMATTED: (message: AppError, code = CODE.INTERNAL_SERVER_ERROR) => ({ status: code, success: false, message: errorHandler(message) }),
  RESPONSE       : (success: boolean, message: string, code: CODE = CODE.OK, data?: unknown) => ({ status: code, success, message, data }),
  DEFAULT        : { status: CODE.INTERNAL_SERVER_ERROR, success: false, message: '' }
}
