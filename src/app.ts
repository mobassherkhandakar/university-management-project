import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandlar';
import router from './app/routers';
const app: Application = express();

//*middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//user Router
app.use('/api/vi', router);

app.use(globalErrorHandler);

export default app;
