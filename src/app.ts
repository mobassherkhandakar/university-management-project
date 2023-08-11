import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandlar';
import router from './app/routers';
import httpStatus from 'http-status';
const app: Application = express();

//*middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//user Router
app.use('/api/vi', router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    massage: 'Not Found',
    errorMassages: [
      {
        path: req.originalUrl,
        message: 'Api is not found',
      },
    ],
  });
  next();
});

export default app;
