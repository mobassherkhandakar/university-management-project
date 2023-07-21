import { NextFunction, Request, Response } from 'express'
import config from '../config'
import { IGenericErrorMessage } from '../interfaces/error'

const globalErrorHandler = (err,req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500
  let message = 'Something went wrong!'
  let errorMessage: IGenericErrorMessage[] = []

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
  next()
}

export default globalErrorHandler
