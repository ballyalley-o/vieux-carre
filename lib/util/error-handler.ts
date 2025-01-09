/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'
import goodlog from 'good-logs'

export const errorHandler = (error: AppError) => {
  if (error instanceof ZodError) {
    const errors = error.errors.map((err) => err.message)
    return errors.join(', ')
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const field = (error.meta as { target?: string[] })?.target ? (error.meta as { target?: string[] }).target![0] : 'Field'
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
  } else {
    return typeof error.message === 'string' ? error.message : JSON.stringify(error.message)
  }
}

// enhance this
class AppErrorLogger {
  private static instance: AppErrorLogger
  private constructor() {}

  static getInstance() {
    if (!AppErrorLogger.instance) {
      AppErrorLogger.instance = new AppErrorLogger()
    }
    return AppErrorLogger.instance
  }

  log(error: AppError) {
    console.error(errorHandler(error))
  }
}

export const SystemErrorLogger = AppErrorLogger.getInstance()
