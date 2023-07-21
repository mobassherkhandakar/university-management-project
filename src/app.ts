import express, { Application, NextFunction, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'
import globalErrorHandler from './middlewares/globalErrorHandlar'

//*midleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//user Router
app.use('/api/vi/user', usersRouter)



app.get('/', (req: Request, res: Response, next: NextFunction) => {
  // throw new ApiError(400,'ore baba error')
  // next('ore baba error ami nai')
  res.send('This server is running on')
})
app.use(globalErrorHandler)

export default app
