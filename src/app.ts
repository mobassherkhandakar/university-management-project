import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'

//*midleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//user Router
app.use('/api/vi/user', usersRouter)

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello is running  World!')
})

export default app
