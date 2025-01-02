import { CODE } from './code'

export const RESPONSE = {
  /*
   * Success response
   * @param code - default 200
   * @param message - message to be displayed
   * @returns  { code: number, success: boolean, message: string }
   */
  SUCCESS: (message: string, code: CODE = CODE.OK) => ({ code, success: true, message }),
  ERROR: (message: string, code = CODE.INTERNAL_SERVER_ERROR) => ({ code, success: false, message }),
  DEFAULT: { code: CODE.INTERNAL_SERVER_ERROR, success: false, message: '' }
}
