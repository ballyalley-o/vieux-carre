import { CODE } from './code'

export const RESPONSE = {
  /*
   * Success response
   * @param code - default 200
   * @param message - message to be displayed
   * @returns  { code: number, success: boolean, message: string }
   */
  SUCCESS: (message: string, code: CODE = CODE.OK) => ({ code, success: true, message }),
  ERROR: (error: string, code = CODE.INTERNAL_SERVER_ERROR) => ({ code, success: false, error })
}
