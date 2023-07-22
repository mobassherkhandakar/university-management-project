import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandlar';
import { UserRoute } from './app/modules/users/users.route';
const app: Application = express();
// import ApiError from './errors/ApiError'

//*middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//user Router
app.use('/api/vi/user', UserRoute);

// app.get('/', async(req: Request, res: Response) => {
// throw new ApiError(400, 'ore baba error')
// Promise.reject(new Error('Ore baba error'))
// console.log(x);
// next('ore baba error ami nai')
// res.send('This server is running on')
// })
app.use(globalErrorHandler);

export default app;
