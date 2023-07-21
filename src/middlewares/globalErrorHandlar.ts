/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
import { ErrorRequestHandler } from 'express'
import config from '../config'
import { IGenericErrorMessage } from '../interfaces/error'
import handleValidationError from './handleValidationError'
import ApiError from '../errors/ApiError'
import { errorLogger } from '../shared/logger'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === 'development'
    ? console.log('🐱‍🏍 globalErrorHandler ~~', error)
    : errorLogger.error(`🐱‍🏍 globalErrorHandler ~~`, error)

  let statusCode = 500
  let message = 'Something went wrong!'
  let errorMessage: IGenericErrorMessage[] = []

  if (error.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessage
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
  next()
}

export default globalErrorHandler
