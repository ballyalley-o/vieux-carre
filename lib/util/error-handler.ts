/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'


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